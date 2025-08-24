'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("schools", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      schema_name: { type: Sequelize.STRING, allowNull: false, unique: true },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
    });

    await queryInterface.createTable("users", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      role: {
        type: Sequelize.ENUM("superadmin", "schooladmin"),
        defaultValue: "schooladmin",
      },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("schools");
  },
};
