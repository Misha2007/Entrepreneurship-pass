'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Experiencepassport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Experiencepassport.init({
    exp_id: DataTypes.UUID,
    pass_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Experiencepassport',
  });
  return Experiencepassport;
};