'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractExchange extends Model {
    static associate(models) {
      ContractExchange.hasMany(models.ContractTraderAccount, { foreignKey: 'contractExchangeId' });
      ContractExchange.belongsTo(models.Contract, { foreignKey: 'contractId' });
      ContractExchange.belongsTo(models.Exchange, { foreignKey: 'exchangeId' });
    }
  }
  ContractExchange.init({
    contractId: DataTypes.INTEGER,
    exchangeId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'ContractExchange',
  });
  return ContractExchange;
};