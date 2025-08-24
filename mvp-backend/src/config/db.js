const { Sequelize } = require("sequelize");
require("dotenv").config();

// Connect using DB_URL (single connection string)
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // Neon requires SSL
      rejectUnauthorized: false, // allow self-signed certs
    },
  },
  logging: false, // disable SQL logs in console
});

module.exports = sequelize;
