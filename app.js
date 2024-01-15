const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./utils/path');
const homeRoutes = require('./routes/home');
const dbRoutes = require('./routes/database');
const authRoutes = require('./routes/authentication');
const { initializeApp } = require("firebase/app");

const firebaseConfig = {
    apiKey: "AIzaSyAOycDldC_EUtx7KzgHlilMhRBi3TK1n4I",
    authDomain: "gitpad-38322.firebaseapp.com",
    projectId: "gitpad-38322",
    storageBucket: "gitpad-38322.appspot.com",
    messagingSenderId: "731146874149",
    appId: "1:731146874149:web:3739a2bb3bbe4ca5607ecc",
    measurementId: "G-JR0K9N58BG"
};

const port = 3000;

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

// initialize Firebase
initializeApp(firebaseConfig);

// static files
app.use(express.static(path.join(rootDir, 'public')));
app.use('/css', express.static(path.join(rootDir, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/images', express.static(path.join(rootDir, 'public', 'images')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use(homeRoutes.router);
app.use(dbRoutes.router);
app.use(authRoutes.router);

app.use((req, res, next) => {
    const viewsData = {
        pageTitle: 'Page not found :/'
    };
    res.status(404).render('404', viewsData);
});

app.listen(port, () => {
    console.log("Server started on localhost:" + port)
});
