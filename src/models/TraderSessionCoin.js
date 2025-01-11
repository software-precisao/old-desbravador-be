'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TraderSessionCoin extends Model {
    static associate(models) {
      TraderSessionCoin.hasMany(models.TraderSessionOrder, { foreignKey: 'traderSessionCoinId' });
      TraderSessionCoin.belongsTo(models.TraderSession, { foreignKey: 'TraderSessionId' });
    }
  }
  TraderSessionCoin.init({
    TraderSessionId: DataTypes.INTEGER,
    symbol: DataTypes.STRING,
    percentageBudget: DataTypes.DOUBLE,
    budgetValue: DataTypes.DOUBLE,
    typePurchase: DataTypes.INTEGER, //** 0- Não | 1- Sim | 3- Parada */
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    qtyPurchase: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'TraderSessionCoin',
  });
  return TraderSessionCoin;
};