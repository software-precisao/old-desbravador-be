'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TraderSessionStartStop extends Model {
    static associate(models) {
      TraderSessionStartStop.belongsTo(models.TraderSession, { foreignKey: 'traderSessionId' });
    }
  }
  TraderSessionStartStop.init({
    traderSessionId: DataTypes.INTEGER,
    type: DataTypes.INTEGER, //** 1- Start | 2- Stop */
    typeReason: DataTypes.INTEGER, //** 1- Ação Externa | 2- Manual Trader */
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'TraderSessionStartStop',
  });
  return TraderSessionStartStop;
};