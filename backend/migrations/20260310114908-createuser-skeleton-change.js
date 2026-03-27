'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.changeColumn("Users", "password", {
          type: Sequelize.STRING(60),
          allowNull: true,
      });

      await queryInterface.changeColumn("Users", "birth", {
          type: Sequelize.DATE,
          allowNull: true,
      }); 
  },

  async down (queryInterface, Sequelize) {
       await queryInterface.removeColumn("Users", "password");

       await queryInterface.removeColumn("Users", "brith");



  }
};
