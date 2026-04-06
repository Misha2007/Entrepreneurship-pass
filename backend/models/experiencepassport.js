"use strict";
import { Model, DataTypes } from "sequelize";
import sequelize from "../util/db.js";

export default (sequelize) => {
  class Experiencepassport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Experience, {
        foreignKey: "exp_id",
        as: "experience",
      });
      this.belongsTo(models.Passport, {
        foreignKey: "pass_id",
        as: "passport",
      });
    }
  }
  Experiencepassport.init(
    {
      exp_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "Experience",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      pass_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "Passport",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
    },
    {
      sequelize,
      modelName: "Experiencepassport",
    },
  );

  return Experiencepassport;
};
