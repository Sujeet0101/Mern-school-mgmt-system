const express = require('express');
const { registerSchool } = require('../controllers/superAdminController');

const router = express.Router();

router.post('/register-school', registerSchool);

module.exports = router;