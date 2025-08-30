const express = require('express');
const { registerSchool } = require('../controllers/superAdminController');
const { authenticate, isSuperAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register-school', authenticate, isSuperAdmin, registerSchool);

module.exports = router;