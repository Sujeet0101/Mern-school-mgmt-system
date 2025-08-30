const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // {id, role, school_id}
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// RBAC helpers
exports.isSuperAdmin = (req, res, next) => {
  if (req.user.role !== "superadmin")
    return res.status(403).json({ message: "Forbidden: SuperAdmin only" });
  next();
};

exports.isSchoolAdmin = (req, res, next) => {
  if (req.user.role !== "schooladmin")
    return res.status(403).json({ message: "Forbidden: SchoolAdmin only" });
  next();
};

exports.isTeacher = (req, res, next) => {
  if (req.user.role !== "teacher")
    return res.status(403).json({ message: "Forbidden: Teacher only" });
  next();
};

exports.isStudent = (req, res, next) => {
  if (req.user.role !== "student")
    return res.status(403).json({ message: "Forbidden: Student only" });
  next();
};

exports.isParent = (req, res, next) => {
  if (req.user.role !== "parent")
    return res.status(403).json({ message: "Forbidden: Parent only" });
  next();
};

// Optional helper for multiple roles
exports.hasRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role))
    return res.status(403).json({ message: `Forbidden: ${roles.join(", ")} only` });
  next();
};