'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExchangeCoin extends Model {
    static associate(models) {
      ExchangeCoin.belongsTo(models.Exchange, { foreignKey: 'exchangeId' });
    }
  }
  ExchangeCoin.init({
    exchangeId: DataTypes.INTEGER,
    symbol: DataTypes.STRING,
    typeCoin: DataTypes.INTEGER, //** 1- Spot | 2- Futuro */
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'ExchangeCoin',
  });
  return ExchangeCoin;
};