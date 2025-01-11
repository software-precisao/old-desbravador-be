'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractTraderAccount extends Model {
    static associate(models) {
      ContractTraderAccount.hasMany(models.TraderSession, { foreignKey: 'ContractTraderAccountId' });
      ContractTraderAccount.belongsTo(models.ContractTrader, { foreignKey: 'contractTraderId' });
      ContractTraderAccount.belongsTo(models.ContractExchange, { foreignKey: 'contractExchangeId' });
    }
  }
  ContractTraderAccount.init({
    contractTraderId: DataTypes.INTEGER,
    contractExchangeId: DataTypes.INTEGER,
    credential: DataTypes.STRING,
    password: DataTypes.STRING,
    walletName: DataTypes.STRING,
    walletKeyHash: DataTypes.STRING,
    keyAPIFuture: DataTypes.STRING,
    secretAPIFuture: DataTypes.STRING,
    keyAPISpot: DataTypes.STRING,
    secretAPISpot: DataTypes.STRING,
    typeAccount: DataTypes.INTEGER, //** 1- Spot | 2- Futuro */
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'ContractTraderAccount',
  });
  return ContractTraderAccount;
};