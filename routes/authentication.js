const express = require('express');
const router = express.Router();
const { handleRegisterForm, handleLoginForm, handleLogout } = require('../controllers/authenticationController');

router.post('/register_email', handleRegisterForm);
router.post('/login_email', handleLoginForm);
router.get('/sign_out', handleLogout);

module.exports = {
    router,
}