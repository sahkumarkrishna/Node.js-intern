const express = require('express');
const { register, login, refreshToken, logout } = require('../controllers/authController');
const router = express.Router();

// Registration Route
router.post('/register', register); 
// Login Route
router.post('/login', login);
// Token Refresh Route
router.post('/refresh-token', refreshToken);
// Logout Route
router.post('/logout', logout);
module.exports = router;