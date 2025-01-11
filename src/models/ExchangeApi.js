'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExchangeApi extends Model {
    static associate(models) {
      ExchangeApi.belongsTo(models.Exchange, { foreignKey: 'exchangeId' });
    }
  }
  ExchangeApi.init({
    exchangeId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    endPoint: DataTypes.STRING,
    description: DataTypes.STRING,
    credential: DataTypes.BOOLEAN,
    typeApi: DataTypes.INTEGER, //** 1- Spot | 2- Futuro | 3- Margem */
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'ExchangeApi',
  });
  return ExchangeApi;
};