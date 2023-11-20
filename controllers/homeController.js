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