'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Novels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.noveledits);
      this.hasOne(model.novelstats);
      this.belongsTo(models.users);
      this.belongsTo(models.novels);
      this.belongsToMany(models.users, { through: 'library' });
      // define association here
    }
  }
  Novels.init({
    novelId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    text: DataTypes.TEXT('long')
  }, {
    sequelize,
    modelName: 'Novels',
  });
  return Novels;
};