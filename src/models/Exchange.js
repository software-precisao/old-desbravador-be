'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exchange extends Model {
    static associate(models) {
      Exchange.hasMany(models.ExchangeBank, { foreignKey: 'exchangeId' });
      Exchange.hasMany(models.ExchangeApi, { foreignKey: 'exchangeId' });
      Exchange.hasMany(models.ExchangeTax, { foreignKey: 'exchangeId' });
      Exchange.hasMany(models.ExchangeCoin, { foreignKey: 'exchangeId' });
      Exchange.hasMany(models.ContractExchange, { foreignKey: 'exchangeId' });
    }
  }
  Exchange.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    website: DataTypes.STRING,
    email: DataTypes.STRING,
    whatsapp: DataTypes.STRING,
    telegram: DataTypes.STRING,
    twitter: DataTypes.STRING,
    leverage: DataTypes.FLOAT,
    minLeverageDegree: DataTypes.FLOAT,
    maxLeverageDegree: DataTypes.FLOAT,
    volatilityTransactions: DataTypes.FLOAT,
    volatilityBusiness: DataTypes.FLOAT,
    namePayPalAccount: DataTypes.STRING,
    hashPayPalAccount: DataTypes.STRING,
    url: DataTypes.STRING,
    urlTest: DataTypes.STRING,
    typeExchange: DataTypes.INTEGER,
    dateLaunched: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'Exchange',
  });
  return Exchange;
};