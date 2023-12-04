
const config = require("../../config/config.json");
const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];
const sequelize = new Sequelize(dbConfig);

const Novels = require('../../models/novels')(sequelize, Sequelize);
exports.sequelize = sequelize
exports.createNovel = async (novelId, user_id, title, text) => {
    Novels.create({
        novelId: novelId,
        userId: user_id,
        title: title,
        text: text
    })
};

exports.getAllNovels = async () => {
    return Novels.findAll();
};

exports.getNovelById = async (id) => {
    // const id = req.params.id;
    return Novels.findByPk(id);
};