"use strict";
import { Model, DataTypes } from "sequelize";
import sequelize from "../util/db.js";

export default (sequelize) => {
  class Experience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Experience.init(
    {
      type: DataTypes.ENUM({
        values: ["Vabatahtlik töö", "Erasmus+ praktika", "Koolitus", "Üritus"],
      }),
      title: DataTypes.STRING,
      date: DataTypes.DATE,
      reflection: DataTypes.STRING,
      fileUrl: DataTypes.STRING,
      mentor_email: DataTypes.STRING,
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "User",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
    },
    {
      sequelize,
      modelName: "Experience",
    },
  );

  return Experience;
};
