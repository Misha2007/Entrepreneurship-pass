import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
import "../util/db.js";
import models from "../models/index.js";

import sequelize from "../util/db.js";

class passController {
  addPass = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const { expIds } = req.body;
      const pass = await models.Passport.create({}, { transaction });
      const user_id = req.user.id;

      if (expIds && expIds.length) {
        const experiences = await models.Experience.findAll({
          where: { id: expIds },
          transaction,
        });

        if (experiences.length !== expIds.length) {
          await transaction.rollback();
          return res
            .status(404)
            .json({ message: "One or more experiences not found" });
        }

        const unauthorized = experiences.some((exp) => exp.userId !== user_id);

        if (unauthorized) {
          await transaction.rollback();
          return res.status(403).json({ message: "Access forbidden" });
        }
        const passLinks = expIds.map((exp_id) => ({
          exp_id,
          pass_id: pass.id,
        }));

        console.log(passLinks);

        await models.Experiencepassport.bulkCreate(passLinks, { transaction });
      }

      await transaction.commit();

      res.status(201).json({
        message: "Passport created successfully",
        passport: pass,
      });
    } catch (err) {
      await transaction.rollback();
      console.error("Error creating passport", err);
      res
        .status(500)
        .json({ message: "Error creating passport", error: err.message });
    }
  };

  getPassById = async (req, res) => {
    try {
      const { passId } = req.params;
      const user_id = req.user.id;
      const experiences = await models.Experiencepassport.findAll({
        where: { pass_id: passId },
        include: [
          {
            model: models.Experience,
            as: "experience",
            attributes: ["id", "type", "date", "fileUrl"],
            include: [
              {
                model: models.User,
                as: "user",
                attributes: ["firstName", "lastName", "birth", "residency"],
              },
            ],
          },
        ],
      });

      res.status(200).json({
        message: "Pass retrieved successfully",
        data: experiences,
      });
    } catch (err) {
      console.error("Error getting pass", err);
      res
        .status(500)
        .json({ message: "Error getting pass", error: err.message });
    }
  };
}

export const PassController = new passController();
