'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.hasMany(models.Functionality, { foreignKey: 'profileId' });
      Profile.hasMany(models.UserProfile, { foreignKey: 'profileId' });
    }
  }
  Profile.init({
    name: DataTypes.STRING,
    hierarchy: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'Profile',
  });
  return Profile;
};