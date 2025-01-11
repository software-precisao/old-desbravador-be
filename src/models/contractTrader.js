'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractTrader extends Model {
    static associate(models) {
      ContractTrader.hasMany(models.ContractTraderAccount, { foreignKey: 'contractTraderId' });
      ContractTrader.hasMany(models.TraderSession, { foreignKey: 'contractTraderId' });
      ContractTrader.belongsTo(models.Contract, { foreignKey: 'contractId' });
      ContractTrader.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  ContractTrader.init({
    contractId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'ContractTrader',
  });
  return ContractTrader;
};