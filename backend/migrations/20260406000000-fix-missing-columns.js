'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "password", {
      type: Sequelize.STRING(60),
      allowNull: true,
    }).catch(() => {}); 

    await queryInterface.addColumn("Users", "provider", {
      type: Sequelize.ENUM('local', 'google', 'smartID', 'mobiiliID'),
      allowNull: true,
      defaultValue: 'local',
    }).catch(() => {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "password");
    await queryInterface.removeColumn("Users", "provider");
  }
};
