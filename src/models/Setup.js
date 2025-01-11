'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Setup extends Model {
    static associate(models) {
      Setup.hasMany(models.SetupIndicator, { foreignKey: 'setupId' });
      Setup.hasMany(models.ContractSetup, { foreignKey: 'setupId' });
      Setup.belongsTo(models.Person, { foreignKey: 'personId' });
    }
  }
  Setup.init({
    personId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    fantasyName: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'Setup',
  });
  return Setup;
};