'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CriteriaScore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CriteriaScore.init({
    firstName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CriteriaScore',
  });
  return CriteriaScore;
};