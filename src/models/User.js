'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserProfile, { foreignKey: 'userId' });
      User.hasMany(models.ContractTrader, { foreignKey: 'userId' });
      User.belongsTo(models.Person, { foreignKey: 'personId' });
    }
  }
  User.init({
    personId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    familyName: DataTypes.STRING,
    document: DataTypes.STRING,
    sex: DataTypes.STRING,
    email: DataTypes.STRING,
    cellphone: DataTypes.STRING,
    password: DataTypes.STRING,
    changePassword: DataTypes.BOOLEAN,
    token2FA: DataTypes.STRING,
    picture: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'User',
  });
  return User;
};