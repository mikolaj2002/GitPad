const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gitpad', 'root', '123456', {
    port: 3307,
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;