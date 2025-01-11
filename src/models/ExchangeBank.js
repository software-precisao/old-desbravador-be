'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExchangeBank extends Model {
    static associate(models) {
      ExchangeBank.belongsTo(models.Exchange, { foreignKey: 'exchangeId' });
    }
  }
  ExchangeBank.init({
    exchangeId: DataTypes.INTEGER,
    bankName: DataTypes.STRING,
    bankCode: DataTypes.STRING,
    agencyCode: DataTypes.STRING,
    accountCode: DataTypes.STRING,
    accountNum: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'ExchangeBank',
  });
  return ExchangeBank;
};