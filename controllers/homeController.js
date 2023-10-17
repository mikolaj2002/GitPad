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