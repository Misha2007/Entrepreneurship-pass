import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
import googleConfig from "../config/google.config.js";
import "../util/db.js";
import models from "../models/index.js";

import { google } from "googleapis";

// create OAuth client
const oauth2Client = new google.auth.OAuth2(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.redirectUrl,
);

class userController {
  // redirect user to Google's OAuth page
  googleAuthStart(req, res) {
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["email", "profile"],
      redirect_uri: googleConfig.redirectUrl,
    });
    res.redirect(url);
  }

  // Handle Google's callback and create/find user
  async googleAuthCallback(req, res) {
    try {
      const { code } = req.query;

      if (!code) {
        return res
          .status(400)
          .json({ message: "No authorization code received" });
      }

      // Exchange code for tokens
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // Get user info from Google
      const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
      const { data: googleUser } = await oauth2.userinfo.get();

      // Find or create user in your DB
      let user = await models.User.findOne({
        where: { email: googleUser.email },
      });

      if (!user) {
        user = await models.User.create({
          firstName: googleUser.given_name || "Google",
          lastName: googleUser.family_name || "User",
          email: googleUser.email,
          birth: null,
          password: null,
          provider: "google",
        });
      }

      // JWT token
      const token = jwt.sign({ userId: user.id }, authConfig.secret, {
        expiresIn: "2h",
      });

      // Redirect to frontend with token
      const redirectUrl = `${googleConfig.frontendCallback}?token=${token}&userId=${user.id}`;
      console.log("Redirecting to frontend:", redirectUrl);
      res.redirect(redirectUrl);
    } catch (error) {
      console.error("Google OAuth callback error:", error);
      res.status(500).json({ message: "Failed to authenticate with Google" });
    }
  }

  createUser(req, res) {
    const saltRounds = 10;
    console.log("Received user data:", req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const birth = req.body.birth;
    const email = req.body.email;
    const password = req.body.password;

    if (!firstName || !lastName || !birth || !email || !password) {
      return res.status(400).json({ message: "Fill all required fields" });
    }

    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return res.status(500).json({ message: "Error generating salt" });
      }

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return res.status(500).json({ message: "Error hashing password" });
        }

        models.User.create({
          firstName: firstName,
          lastName: lastName,
          birth: birth,
          email: email,
          password: hash,
          provider: "local",
        })
          .then((newUser) => {
            const token = jwt.sign({ userId: newUser.id }, authConfig.secret, {
              expiresIn: "2h",
            });

            console.log(hash);

            res.status(201).json({
              message: "Created new user",
              newUser: newUser,
              accessToken: token,
            });

            console.log(
              `[Server]: ${newUser.firstName} (${newUser.lastName}) signed up`,
            );
          })
          .catch((err) => {
            res
              .status(500)
              .json({ message: "Error creating user", error: err.message });
          });
      });
    });
  }

  getUser(req, res) {
    if (req.body.email == null || req.body.password == null) {
      return res.status(400).json({ message: "Fill all required fields" });
    }

    models.User.findOne({ where: { email: req.body.email } }).then(
      (newUser) => {
        if (!newUser) {
          return res.status(404).json({
            error: "User not found",
          });
        }

        const storedHashedPassword = newUser.password;
        const userInputPassword = req.body.password;

        bcrypt.compare(
          userInputPassword,
          storedHashedPassword,
          async (err, result) => {
            if (err) {
              console.error("Error comparing passwords: ", err);
              return;
            }

            console.log("INPUT PASSWORD:", JSON.stringify(userInputPassword));
            console.log("HASH FROM DB:", JSON.stringify(storedHashedPassword));
            console.log("INPUT LENGTH:", userInputPassword.length);
            console.log("HASH LENGTH:", storedHashedPassword.length);

            const token = jwt.sign(
              { userId: newUser.id },
              authConfig.secret,

              { expiresIn: "2h" },
            );

            console.log("login user token", newUser.id);

            if (result) {
              console.log(
                `[Server]: ${newUser.firstName} (${newUser.lastName}) logged in`,
              );
              res.json({
                user: {
                  id: newUser.id,
                  firstName: newUser.firstName,
                  lastName: newUser.lastName,
                  email: newUser.email,
                },
                accessToken: token,
              });
            } else {
              console.log(result);
              console.log(token);
              console.log(userInputPassword.length, storedHashedPassword);
              console.log("[Server]: Passwords do not match! Auth failed.");
              res.status(401).send("Invalid credentials");
            }
          },
        );
      },
    );
  }

  getUserData(req, res) {
    const userId = req.user.id;
    User.findByPk(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json({
          firstName: user.firstName,
          lastName: user.lastName,
          birth: user.birth,
          email: user.email,
          phone: user.phone,
          residency: user.residency,
          education: user.education,
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Error fetching user data", error: err.message });
      });
  }

  updateUserData(req, res) {
    const userId = req.user.id;
    const { firstName, lastName, birth, email, phone, residency, education } =
      req.body;
    User.findByPk(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.birth = birth || user.birth;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.residency = residency || user.residency;
        user.education = education || user.education;

        return user.save();
      })
      .then((updatedUser) => {
        res.json({
          message: "User data updated successfully",
          user: {
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            birth: updatedUser.birth,
            email: updatedUser.email,
            phone: updatedUser.phone,
            residency: updatedUser.residency,
            education: updatedUser.education,
          },
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Error updating user data", error: err.message });
      });
  }
}

export const UserController = new userController();
