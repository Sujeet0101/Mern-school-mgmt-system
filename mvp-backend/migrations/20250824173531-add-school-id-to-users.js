'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn("users", "school_id", {
       type: Sequelize.INTEGER,
       references: {
         model: "schools",
         key: "id",
       },
       onDelete: "CASCADE",
       allowNull: true, // superadmins will have NULL
     });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn("users", "school_id");
  }
};
