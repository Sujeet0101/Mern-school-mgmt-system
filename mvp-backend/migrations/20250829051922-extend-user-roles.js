'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     // Add new roles to ENUM
    await queryInterface.sequelize.query(
      `ALTER TYPE "enum_users_role" ADD VALUE IF NOT EXISTS 'teacher';`
    );
    await queryInterface.sequelize.query(
      `ALTER TYPE "enum_users_role" ADD VALUE IF NOT EXISTS 'student';`
    );
    await queryInterface.sequelize.query(
      `ALTER TYPE "enum_users_role" ADD VALUE IF NOT EXISTS 'parent';`
    );
  },

  async down (queryInterface, Sequelize) {
    // ⚠️ ENUM rollback is tricky in Postgres.
    // The simple way is to recreate ENUM if you ever need rollback.
    // For MVP you usually don’t bother with rollback here.
  }
};
