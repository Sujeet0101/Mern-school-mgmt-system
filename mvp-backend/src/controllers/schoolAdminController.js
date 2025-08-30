const bcrypt = require("bcrypt");
const { User } = require("../models");

// School Admin creates teacher/student/parent
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const school_id = req.user.school_id; // comes from JWT (RBAC middleware)

    // Validate role
    if (!["teacher", "student", "parent"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if email already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user under this school
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      school_id,
    });

    return res.status(201).json({
      message: `${role} created successfully`,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
