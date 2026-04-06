"use strict";
import { Model, DataTypes } from "sequelize";
import sequelize from "../util/db.js";

export default (sequelize) => {
  class Passport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Passport.init(
    {},
    {
      sequelize,
      modelName: "Passport",
    },
  );
  return Passport;
};
