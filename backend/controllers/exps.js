import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
import "../util/db.js";
import Experience from "../models/experience.js";

class expsController {
  addExp = async (req, res) => {
    try {
      const { type, title, date, reflection, mentor_email } = req.body;
      const converted_date = new Date(date);
      const userId = req.user.id;

      if (!type || !title || !date || !reflection || !mentor_email) {
        return res.status(400).json({ message: "Fill all required fields" });
      }

      const addedExp = await Experience.create({
        type: type,
        title: title,
        reflection: reflection,
        mentor_email: mentor_email,
        userId: userId,
        date: converted_date,
        fileUrl: req.body.fileUrl || null,
      });

      res.status(201).json({
        message: "Experience created successfully",
        experience: addedExp,
      });

      console.log(
        `[Server]: ${newUser.firstName} (${newUser.lastName}) added experience ${addedExp.title}`,
      );
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error creating experience", error: err.message });
    }
  };

  getExps = async (req, res) => {
    try {
      const userId = req.user.id;
      const experiences = await Experience.findAll({ where: { userId } });
      res.status(200).json(experiences);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching experiences", error: err.message });
    }
  };
}

export const ExpsController = new expsController();
