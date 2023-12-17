
const config = require("../../config/config.json");
const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];
const sequelize = new Sequelize(dbConfig);

const Users = require('../../models/users')(sequelize, Sequelize);
exports.sequelize = sequelize
exports.createUser = async (nick, follows, red_flags) => {
    Users.create({
        nick: nick,
        follows: follows,
        red_flags: red_flags
    })
};

exports.getAllUsers = async () => {
    return Users.findAll();
};

exports.getUserById = async (id) => {
    // const id = req.params.id;
    return Users.findByPk(id);
};

exports.getUserStats = async (req, res) => {
    try {
        const user = await Users.findByPk(req.body.id);
        res.json(user);
    }catch(err){
      res.status(500).json({ error: err.message });
    }
};