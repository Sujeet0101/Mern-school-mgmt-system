const bcrypt = require("bcrypt");
const School = require("../models/superAdmin/School");
const User = require("../models/superAdmin/User");
const sequelize = require("../config/db");

exports.registerSchool = async (req, res) => {
  const t = await sequelize.transaction(); // transaction for consistency
  try {
    const { schoolName, adminName, adminEmail, adminPassword } = req.body;

    // check if school already exists by name
    const existingSchool = await School.findOne({
      where: { name: schoolName },
    });
    if (existingSchool) {
      return res.status(400).json({ message: "School already exists" });
    }

    // check if admin email already exists
    const existingUser = await User.findOne({ where: { email: adminEmail } });
    if (existingUser) {
      return res.status(400).json({ message: "Admin email already in use" });
    }

    // generate tenant schema name
    const schema_name = `school_${schoolName
      .toLowerCase()
      .replace(/\s+/g, "_")}`;

    // create school entry
    const school = await School.create(
      { name: schoolName, schema_name },
      { transaction: t }
    );

    // hash admin password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // create school admin user
    const adminUser = await User.create(
      {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: "schooladmin",
        school_id: school.id, // link admin to the school
      },
      { transaction: t }
    );

    // create tenant schema
    await sequelize.query(`CREATE SCHEMA IF NOT EXISTS "${schema_name}";`, {
      transaction: t,
    });

    await t.commit();

    return res.status(201).json({
      message: "School registered successfully",
      school,
      adminUser,
    });
  } catch (err) {
    console.error(err);
    await t.rollback();
    res.status(500).json({ message: "Internal server error" });
  }
};
