'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Choice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Choice.belongsTo(models.Question)
    }
  };
  Choice.init({
    choice: DataTypes.STRING,
    questionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Choice',
  });
  return Choice;
};