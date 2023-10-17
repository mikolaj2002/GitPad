const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./utils/path');
const homeRoutes = require('./routes/home');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');


// static files
app.use(express.static(path.join(rootDir, 'public')));
app.use('/css', express.static(path.join(rootDir, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/images', express.static(path.join(rootDir, 'public', 'images')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use(homeRoutes.router);

app.use((req,res,next)=>{
    const viewsData = {
        pageTitle: 'Page not found :/'
    };
    res.status(404).render('404', viewsData);
});

app.listen(port, ()=>{
    console.log("Server started on localhost:"+port)
});