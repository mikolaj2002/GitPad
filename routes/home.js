const express = require('express');
const router = express.Router();
const { getHomePage,getAddPage, getCategoryPage, getLibraryPage, getAboutPage, getAccountPage, getLoginPage, getRegisterPage, getContactPage} = require("../controllers/homeController");

router.get('/', getHomePage);
router.get('/add', getAddPage);
router.get('/categories', getCategoryPage);
router.get('/library', getLibraryPage);
router.get('/about', getAboutPage);
router.get('/account', getAccountPage);
router.get('/login', getLoginPage);
router.get('/register', getRegisterPage);
router.get('/contact', getContactPage);



module.exports = {
    router,
}