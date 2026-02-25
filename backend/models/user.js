"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Country, {
        foreignKey: "countryId",
        as: "countries",
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      birth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      password: {
        type: DataTypes.CHAR(60),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("created", "confirmed", "deleted", "banned"),
        allowNull: false,
        defaultValue: "created",
      },
      phone: DataTypes.STRING,
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Countries",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      residency: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
