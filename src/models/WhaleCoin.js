'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WhaleCoin extends Model {
    static associate(models) {
      WhaleCoin.belongsTo(models.Whale, { foreignKey: 'whaleId' });
      WhaleCoin.belongsTo(models.Coin, { foreignKey: 'coinId' });
    }
  }
  WhaleCoin.init({
    whaleId: DataTypes.INTEGER,
    coinId: DataTypes.INTEGER,
    blockChainNet: DataTypes.STRING,
    balance: DataTypes.DOUBLE,
    dtBalance: DataTypes.DATE,
    typeLastOperation: DataTypes.INTEGER, //** 1- Entrando na Blockchain | 2- Saindo da Blockchain */
    dtLastOperation: DataTypes.DATE,
    originEntrance: DataTypes.STRING,
    originOutgoing: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'WhaleCoin',
  });
  return WhaleCoin;
};