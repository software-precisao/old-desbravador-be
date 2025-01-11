'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExchangeTax extends Model {
    static associate(models) {
      ExchangeTax.belongsTo(models.Exchange, { foreignKey: 'exchangeId' });
    }
  }
  ExchangeTax.init({
    exchangeId: DataTypes.INTEGER,
    transaction: DataTypes.STRING,
    futureMaintenance: DataTypes.STRING,
    futureFundingFee: DataTypes.STRING,
    cashout: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'ExchangeTax',
  });
  return ExchangeTax;
};