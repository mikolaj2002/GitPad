const { getUserId } = require("./authenticationController");
const config = require("../config/config.json");
const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];
const sequelize = new Sequelize(dbConfig);
const Users = require('../models/users')(sequelize, Sequelize);
const Novels = require('../models/novels')(sequelize, Sequelize);
const Reports = require('../models/reports')(sequelize, Sequelize);



exports.getHomePage = async (req, res) => {
  try {
    let ids = []
    const all_stories = await Novels.findAll();
    for (let story of all_stories) {
      ids.push(story.id);
    }
    const rand_id = ids[Math.floor(Math.random() * ids.length)];


    const stories = await Novels.findAll({
      where: {
        novelId: rand_id
      }
    });

    const mainStory = await Novels.findOne({
      where: {
        id: rand_id
      }
    });

    const viewsData = {
      stories: stories,
      mainStory: mainStory,
      pageTitle: 'Gidpad - Strona główna',
    };
    res.render('home', viewsData);
  } catch (e) {
    console.log(e);
    res.status(500).send("Błąd bazy, sprawdź połaczenie!");
  }
};


exports.getSpecifiedHomePage = async (req, res) => {
  try {
    const rand_id = req.params.novelId

    const stories = await Novels.findAll({
      where: {
        novelId: rand_id
      }
    });

    const mainStory = await Novels.findOne({
      where: {
        id: rand_id
      }
    });

    const viewsData = {
      stories: stories,
      mainStory: mainStory,
      pageTitle: 'Gidpad - Strona główna',
    };
    res.render('home', viewsData);
  } catch (e) {
    console.log(e);
    res.status(500).send("Błąd bazy, sprawdź połaczenie!");
  }
};

exports.getAddPage = async (req, res) => {
  const user = getUserId()
  if (user == null) {
    const errorMessage = 'Musisz być zalogowany by stworzyć opowieść';
    res.redirect('/account?error=' + errorMessage);
  } else {
    const user = await Users.findOne({ attributes: ['id'], where: { uid: getUserId() } })
    if (user == null) {
      const errorMessage = 'Użytkownik istnieje w bazie firebase, ale nie w lokalnej bazie';
      res.redirect('/account?error=' + errorMessage);
    } else {
      // console.log(user)
      const viewsData = {
        pageTitle: 'GitPad - Home',
      };
      res.render('add', viewsData);
    }
  }
};


exports.getLibraryPage = async (req, res) => {
  const stories = await Novels.findAll();
  const viewsData = {
    stories,
    pageTitle: 'GitPad - Biblioteka',
  };
  res.render('library', viewsData);
};

exports.getAboutPage = (req, res) => {
  const viewsData = {
    pageTitle: 'GitPad - About us',
  };
  res.render('about', viewsData);
};

exports.getAccountPage = async (req, res) => {
  const user = getUserId();
  if (user == null) {
    const viewsData = {
      pageTitle: 'GitPad - Konto',
    };
    res.render('account', viewsData);
  } else {
    const user = await Users.findOne({ attributes: ['id'], where: { uid: getUserId() } })
    if (user == null) {
      const viewsData = {
        pageTitle: 'GitPad - Konto',
      };
      res.render('account', viewsData);
    }
    else
      res.redirect('/account_info');
  }
};

exports.getAccountInfoPage = async (req, res) => {
  const user = getUserId()
  if (user != null) {
    const user = await Users.findOne({ where: { uid: getUserId() } });
    if (user == null) {
      const viewsData = {
        pageTitle: 'GitPad - Konto',
      };
      res.render('account', viewsData);
    }
    else {
      const viewsData = {
        pageTitle: 'GitPad- Konto ',
        userName: user.nick,
        userFlags: user.red_flags,
        createdAt: user.createdAt.getDate() + "." + user.createdAt.getMonth() + 1 + "." + user.createdAt.getFullYear() + "r."
      };
      res.render('account_info', viewsData);
    }
  } else {
    res.redirect('/account');
  }
};

exports.getLoginPage = (req, res) => {
  const viewsData = {
    pageTitle: 'GitPad - Logowanie',
  };
  res.render('login', viewsData);
};

exports.getRegisterPage = (req, res) => {
  const viewsData = {
    pageTitle: 'GitPad - Rejestracja',
  };
  res.render('register', viewsData);
};

exports.getContactPage = (req, res) => {
  const report_id = req.params.novelId

  let viewsData = {}
  if (report_id) {
    viewsData = {
      novelId: report_id,
      pageTitle: 'GitPad - Kontakt',
    };
  } else {
    viewsData = {
      novelId: null,
      pageTitle: 'GitPad - Kontakt',
    };
  }
  res.render('contact', viewsData);
};

exports.postReport = async (req, res) => {
  try {
    const novelId = req.params.novelId;
    const topic = req.params.topic;
    const message = req.body.message;

    const newReport = await Reports.create({
      novelId: novelId,
      topic: topic,
      message: message
    });

    const viewsData = {
      pageTitle: 'GitPad - Zgłoszono',
    };
    res.render('reported', viewsData);
  } catch (error) {
    console.error(error);
  }
};

exports.postSend = async (req, res) => {
  try {
    const novelId = req.params.novelId;
    const topic = req.body.topic;
    const message = req.body.message;

    const newReport = await Reports.create({
      topic: topic,
      message: message
    });

    const viewsData = {
      pageTitle: 'GitPad - Wysłano wiadmość',
    };
    res.render('reported', viewsData);
  } catch (error) {
    console.error(error);
  }
};