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
    // novel_id: DataTypes.INTEGER,
    chapter_id: DataTypes.INTEGER,
    edit_start: DataTypes.INTEGER,
    edit_end: DataTypes.INTEGER,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NovelEdits',
  });
  return NovelEdits;
};