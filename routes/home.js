const express = require('express');
const router = express.Router();
const { getHomePage,getAddPage, getLibraryPage, getAboutPage, getAccountPage, getLoginPage, getRegisterPage, getContactPage, getSpecifiedHomePage, postReport, postSend} = require("../controllers/homeController");

router.get('/', getHomePage);
router.get('/novel/:novelId', getSpecifiedHomePage);
router.get('/add', getAddPage);
router.get('/library', getLibraryPage);
router.get('/about', getAboutPage);
router.get('/account', getAccountPage);
router.get('/account_info', getAccountInfoPage);
router.get('/login', getLoginPage);
router.get('/register', getRegisterPage);
router.get('/contact', getContactPage);
router.get('/contact/:novelId', getContactPage);
router.post('/contact/:novelId/:topic', postReport);
router.post('/send', postSend);







module.exports = {
    router,
}