const express = require('express');
const router = express.Router();
const { getHomePage,getAddPage, getCategoryPage, getLibraryPage, getAboutPage, getAccountPage, getAccountInfoPage, getLoginPage, getRegisterPage, getContactPage, getSpecifiedHomePage} = require("../controllers/homeController");

router.get('/', getHomePage);
router.get('/novel/:novelId', getSpecifiedHomePage);
router.get('/add', getAddPage);
router.get('/categories', getCategoryPage);
router.get('/library', getLibraryPage);
router.get('/about', getAboutPage);
router.get('/account', getAccountPage);
router.get('/account_info', getAccountInfoPage);
router.get('/login', getLoginPage);
router.get('/register', getRegisterPage);
router.get('/contact', getContactPage);



module.exports = {
    router,
}