'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Whale extends Model {
    static associate(models) {
      Whale.hasMany(models.WhaleCoin, { foreignKey: 'whaleId' });
      Whale.belongsTo(models.Person, { foreignKey: 'personId' });
    }
  }
  Whale.init({
    personId: DataTypes.INTEGER,
    walleHashCode: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'Whale',
  });
  return Whale;
};