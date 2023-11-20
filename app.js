const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./utils/path');
const homeRoutes = require('./routes/home');

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAOycDldC_EUtx7KzgHlilMhRBi3TK1n4I",
    authDomain: "gitpad-38322.firebaseapp.com",
    projectId: "gitpad-38322",
    storageBucket: "gitpad-38322.appspot.com",
    messagingSenderId: "731146874149",
    appId: "1:731146874149:web:3739a2bb3bbe4ca5607ecc",
    measurementId: "G-JR0K9N58BG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.set('views', 'views');


// static files
app.use(express.static(path.join(rootDir, 'public')));
app.use('/css', express.static(path.join(rootDir, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/images', express.static(path.join(rootDir, 'public', 'images')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use(homeRoutes.router);

app.use((req, res, next) => {
    const viewsData = {
        pageTitle: 'Page not found :/'
    };
    res.status(404).render('404', viewsData);
});

app.listen(port, () => {
    console.log("Server started on localhost:" + port)
});