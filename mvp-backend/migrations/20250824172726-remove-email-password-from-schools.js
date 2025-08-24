'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("schools", "email");
    await queryInterface.removeColumn("schools", "password");
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.addColumn("schools", "email", {
     type: Sequelize.STRING,
     allowNull: false,
     unique: true,
   });
   await queryInterface.addColumn("schools", "password", {
     type: Sequelize.STRING,
     allowNull: false,
   });
  }
};
