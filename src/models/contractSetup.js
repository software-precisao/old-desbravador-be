'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractSetup extends Model {
    static associate(models) {
      ContractSetup.hasMany(models.TraderSessionSetup, { foreignKey: 'contractSetupId' });
      ContractSetup.belongsTo(models.Contract, { foreignKey: 'contractId' });
      ContractSetup.belongsTo(models.Setup, { foreignKey: 'setupId' });
    }
  }
  ContractSetup.init({
    contractId: DataTypes.INTEGER,
    setupId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'ContractSetup',
  });
  return ContractSetup;
};