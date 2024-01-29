'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reports extends Model {
    static associate(models) {
        
      }
  }
  Reports.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
    novelId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    topic: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Reports',
  });
  return Reports;
};