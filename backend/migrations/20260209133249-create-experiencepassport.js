"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Experiencepassports", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      exp_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Experiences",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      pass_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Passports",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Experiencepassports");
  },
};
