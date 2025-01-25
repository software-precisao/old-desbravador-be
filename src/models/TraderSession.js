'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TraderSession extends Model {
    static associate(models) {
      TraderSession.hasMany(models.TraderSessionCoin, { foreignKey: 'traderSessionId' });
      TraderSession.hasMany(models.TraderSessionSetup, { foreignKey: 'traderSessionId' });
      TraderSession.hasMany(models.TraderSessionEvent, { foreignKey: 'traderSessionId' });
      TraderSession.hasMany(models.TraderSessionOrder, { foreignKey: 'traderSessionId' });
      TraderSession.hasMany(models.TraderSessionStartStop, { foreignKey: 'traderSessionId' });
      TraderSession.belongsTo(models.ContractTrader, { foreignKey: 'contractTraderId' });
      TraderSession.belongsTo(models.ContractTraderAccount, { foreignKey: 'contractTraderAccountId' });
      
    }
  }
  TraderSession.init({
    contractTraderId: DataTypes.INTEGER,
    contractTraderAccountId: DataTypes.INTEGER,
    name:DataTypes.STRING,
    beginDateSession:DataTypes.DATE,
    endDateSession:DataTypes.DATE,
    allocatedPercentage:DataTypes.DOUBLE,
    securityPercentage:DataTypes.DOUBLE,
    allocatedValue:DataTypes.DOUBLE,
    typeOrder:DataTypes.INTEGER, //** 1- Trailing Stop | 2- The Market | 3- Limit */
    typeRisk:DataTypes.DOUBLE, //** Call Back = 0.1  < 4.0  - Defalt = 0.3 */
    typeUseBalance:DataTypes.INTEGER, //** Stop Loss */
    typeRebalancing:DataTypes.DOUBLE, //** 1- Não Fazer | 2- A Cada 4Hs | 2- A Cada 8Hs */
    typeSenseOrder:DataTypes.INTEGER,  //** 1- Hedge Mode | 2- One-way Mode */
    typeOrderManagement:DataTypes.INTEGER, //** 1- Ilimitado | 2- Um | 3- Dois | 4- Três | 5- Quatro | 6- Cinco */
    typeMarketplace:DataTypes.INTEGER, //** Leverage Inteiro de 1 - 125 */
    typeCurrencyGroup:DataTypes.DOUBLE, //** Activation Price = 0.1 */
    typeDocker: DataTypes.INTEGER, //** 0- No Start / Stop | 1- Start | 3- Stop */
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'TraderSession',
  });
  return TraderSession;
};