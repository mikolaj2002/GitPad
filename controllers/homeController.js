const { getUserId } = require("./authenticationController");

// do sprawdzania czy user istnieje w bazie
const config = require("../config/config.json");
const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];
const sequelize = new Sequelize(dbConfig);
const Users = require('../models/users')(sequelize, Sequelize);

exports.getHomePage = (req, res) =>{
    const viewsData = {
        pageTitle: 'GitPad - Home',
    };
    res.render('home', viewsData);
};

exports.getAddPage = async (req, res) =>{
    const user = getUserId()
    if(user == null){
        const errorMessage = 'Musisz być zalogowany by stworzyć opowieść';
        res.redirect('/account?error=' + errorMessage);
    }else{
        const user = await Users.findOne({attributes: ['id'],where:{uid:getUserId()}})
        if(user == null){
            const errorMessage = 'Użytkownik istnieje w bazie firebase, ale nie w lokalnej bazie';
            res.redirect('/account?error=' + errorMessage);
        }else{
            // console.log(user)
            const viewsData = {
                pageTitle: 'GitPad - Home',
            };
            res.render('add', viewsData);
        }
    }
};

exports.getCategoryPage = (req, res) =>{
    const viewsData = {
        pageTitle: 'GitPad - Kategorie',
    };
    res.render('categories', viewsData);
};

exports.getLibraryPage = (req, res) =>{
    const viewsData = {
        pageTitle: 'GitPad - Biblioteka',
    };
    res.render('library', viewsData);
};

exports.getAboutPage = (req, res) =>{
    const viewsData = {
        pageTitle: 'GitPad - About us',
    };
    res.render('about', viewsData);
};

exports.getAccountPage = (req, res) =>{
    const viewsData = {
        pageTitle: 'GitPad - Konto',
    };
    res.render('account', viewsData);
};

exports.getLoginPage = (req, res) =>{
    const viewsData = {
        pageTitle: 'GitPad - Logowanie',
    };
    res.render('login', viewsData);
};

exports.getRegisterPage = (req, res) =>{
    const viewsData = {
        pageTitle: 'GitPad - Rejestracja',
    };
    res.render('register', viewsData);
};

exports.getContactPage = (req, res) =>{
    const viewsData = {
        pageTitle: 'GitPad - Kontakt',
    };
    res.render('contact', viewsData);
};