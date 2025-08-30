const express = require("express");
const { createUser } = require("../controllers/schoolAdminController");
const { authenticate, isSchoolAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// POST /school-admin/create-user
router.post("/create-user", authenticate, isSchoolAdmin, createUser);

module.exports = router;
