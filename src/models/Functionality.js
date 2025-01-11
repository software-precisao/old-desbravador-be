'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Functionality extends Model {
    static associate(models) {
      Functionality.belongsTo(models.Profile, { foreignKey: 'profileId' });
    }
  }
  Functionality.init({
    profileId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    route: DataTypes.STRING,
    icon: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'Functionality',
  });
  return Functionality;
};