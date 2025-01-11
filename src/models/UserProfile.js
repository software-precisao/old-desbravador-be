'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    static associate(models) {
      UserProfile.belongsTo(models.User, { foreignKey: 'userId' });
      UserProfile.belongsTo(models.Profile, { foreignKey: 'profileId' });
    }
  }
  UserProfile.init({
    userId:DataTypes.INTEGER,
    profileId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'UserProfile',
  });
  return UserProfile;
};