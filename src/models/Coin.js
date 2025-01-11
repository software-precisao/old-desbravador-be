'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coin extends Model {
    static associate(models) {
      Coin.hasMany(models.WhaleCoin, { foreignKey: 'coinId' });
    }
  }
  Coin.init({
    name: DataTypes.STRING,
    symbol: DataTypes.STRING,
    logo: DataTypes.STRING,
    rank : DataTypes.INTEGER,
    website: DataTypes.STRING,
    blockChainNet: DataTypes.STRING,
    dateLaunched: DataTypes.DATE,
    decimalPlaces: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'Coin',
  });
  return Coin;
};