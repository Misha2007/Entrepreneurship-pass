"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "firstName", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Users", "lastName", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Users", "birth", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn("Users", "password", {
      type: Sequelize.STRING(60),
      allowNull: false,
    });
    await queryInterface.addColumn("Users", "status", {
      type: Sequelize.ENUM({
        values: ["created", "confirmed", "deleted", "banned"],
      }),
      defaultValue: "created",
      allowNull: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "password");
    await queryInterface.removeColumn("Users", "status");
  },
};
