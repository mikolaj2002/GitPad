const express = require('express');
const router = express.Router();
const { handleRegisterForm, handleLoginForm } = require('../controllers/authenticationController');

router.post('/register_email', handleRegisterForm);
router.post('/login_email', handleLoginForm)

module.exports = {
    router,
}