'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TraderSessionSetup extends Model {
    static associate(models) {
      TraderSessionSetup.hasMany(models.TraderSessionSetupIndicator, { foreignKey: 'traderSessionSetupId' });
      TraderSessionSetup.belongsTo(models.TraderSession, { foreignKey: 'traderSessionId' });
      TraderSessionSetup.belongsTo(models.ContractSetup, { foreignKey: 'contractSetupId' });
    }
  }
  TraderSessionSetup.init({
    traderSessionId: DataTypes.INTEGER,
    contractSetupId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'TraderSessionSetup',
  });
  return TraderSessionSetup;
};