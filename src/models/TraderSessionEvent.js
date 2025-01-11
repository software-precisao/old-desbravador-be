'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TraderSessionEvent extends Model {
    static associate(models) {
      TraderSessionEvent.belongsTo(models.TraderSession, { foreignKey: 'traderSessionId' });
    }
  }
  TraderSessionEvent.init({
    traderSessionId: DataTypes.INTEGER,
    payload: DataTypes.STRING,
    typeAction: DataTypes.INTEGER, //** 1- Não comprou | 2- Comprou */
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'TraderSessionEvent',
  });
  return TraderSessionEvent;
};