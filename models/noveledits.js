'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NovelEdits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.novels);
    }
  }
  NovelEdits.init({
    novelId: DataTypes.INTEGER,
    chapter_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'NovelEdits',
  });
  return NovelEdits;
};