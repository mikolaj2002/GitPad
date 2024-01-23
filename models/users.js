'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.novels);
      // this.hasMany(models.novels, { through: 'library' });
    }
  }
  Users.init({
    uid: DataTypes.STRING,
    nick: DataTypes.STRING,
    follows: DataTypes.INTEGER,
    red_flags: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};