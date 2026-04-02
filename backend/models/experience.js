"use strict";
import { Model, DataTypes } from "sequelize";
import sequelize from "../util/db.js";

class Experience extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: "userId",
      as: "users",
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
    userId: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Experience",
  },
);

export default Experience;
