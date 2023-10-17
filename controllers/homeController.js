exports.getHomePage = (req, res) =>{
    const viewsData = {
        pageTitle: 'GitPad - Home',
    };
    res.render('home', viewsData);
};

exports.getAddPage = (req, res) =>{
    const viewsData = {
        pageTitle: 'GitPad - Home',
    };
    res.render('add', viewsData);
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