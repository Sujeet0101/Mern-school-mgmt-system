const bcrypt = require("bcrypt");
const School = require("../models/superAdmin/School");
const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");

exports.registerSchool = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if school already exists
    const existing = await School.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "School already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate schema name (tenant schema)
    const schema_name = `school_${name.toLowerCase().replace(/\s+/g, "_")}`;

    // Create school entry in global 'schools' table
    const school = await School.create({
      name,
      email,
      password: hashedPassword,
      schema_name,
    });

    // Create schema for tenant
    await sequelize.query(
      `CREATE SCHEMA IF NOT EXISTS "${schema_name}";`
    );

    return res
      .status(201)
      .json({ message: "School registered successfully", school });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
