const express = require('express');
const router = express.Router();
const { getHomePage,getAddPage} = require("../controllers/homeController");

router.get('/', getHomePage);
router.get('/add', getAddPage);

module.exports = {
    router,
}