'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TraderSessionOrder extends Model {
    static associate(models) {
      TraderSessionOrder.belongsTo(models.TraderSession, { foreignKey: 'traderSessionId' });
      TraderSessionOrder.belongsTo(models.TraderSessionCoin, { foreignKey: 'traderSessionCoinId' });
    }
  }
  TraderSessionOrder.init({
    traderSessionId: DataTypes.INTEGER,
    traderSessionCoinId: DataTypes.INTEGER,
    orderId:DataTypes.STRING,
    symbol:DataTypes.STRING,
    status:DataTypes.STRING,
    price:DataTypes.DOUBLE,
    origQty:DataTypes.DOUBLE,
    executedQty:DataTypes.DOUBLE,
    cumQty:DataTypes.DOUBLE,
    activatePrice:DataTypes.DOUBLE,
    priceRate:DataTypes.DOUBLE,
    timeInForce:DataTypes.STRING,
    type:DataTypes.STRING,
    reduceOnly:DataTypes.BOOLEAN,
    closePosition:DataTypes.BOOLEAN,
    side:DataTypes.STRING,
    positionSide:DataTypes.STRING,
    stopPrice:DataTypes.DOUBLE,
    workingType:DataTypes.STRING,
    priceProtect:DataTypes.BOOLEAN,
    origType:DataTypes.STRING,
    updateTime:DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
  sequelize,
  tableName: 'TraderSessionOrder',
});
return TraderSessionOrder;
};