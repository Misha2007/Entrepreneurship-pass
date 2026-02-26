import * as bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
import "../util/db.js";
import User from "../models/user.js";

class userController {
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

        User.create({
          firstName: firstName,
          lastName: lastName,
          birth: birth,
          email: email,
          password: hash,
        })
          .then((newUser) => {
            const token = jwt.sign({ userId: newUser.id }, authConfig.secret, {
              expiresIn: "2h",
            });

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

    User.findOne({ where: { email: req.body.email } }).then((newUser) => {
      if (!newUser) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      const storedHashedPassword = newUser.password;
      const userInputPassword = req.body.password;

      bcrypt.compare(userInputPassword, storedHashedPassword, (err, result) => {
        if (err) {
          console.error("Error comparing passwords: ", err);
          return;
        }

        const token = jwt.sign(
          { clientId: newUser.clientId },
          authConfig.secret,

          { expiresIn: "2h" },
        );

        console.log("login user token", newUser.clientId);

        if (result) {
          console.log(
            `[Server]: ${newUser.firstName} (${newUser.lastName}) logged in`,
          );
          return res.json({
            user: newUser,
            accessToken: token,
          });
        } else {
          console.log("[Server]: Passwords do not match! Auth failed.");
          res.status(401).send("Invalid credentials");
        }
      });
    });
  }
}

export const UserController = new userController();
