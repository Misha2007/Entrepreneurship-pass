'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addColumn("Users", "provider", {
        type: Sequelize.ENUM('local', 'google', 'smartID', 'mobiiliID'),
        allowNull: true,
        defaultvalue: 'local',
    });
  },

  async down (queryInterface, Sequelize) {
       await queryInterface.removeColumn("Users", "provider");

  }
};
