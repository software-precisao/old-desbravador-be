'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    static associate(models) {
      Person.hasMany(models.Contact, { foreignKey: 'personId' });
      Person.hasMany(models.ProductService, { foreignKey: 'personId' });
      Person.hasMany(models.Whale, { foreignKey: 'personId' });
      Person.hasMany(models.Setup, { foreignKey: 'personId' });
      Person.hasMany(models.User, { foreignKey: 'personId' });
      Person.hasMany(models.Contract, { foreignKey: 'personId' });
    }
  }
  Person.init({
    document: DataTypes.STRING,
    companyName: DataTypes.STRING,
    fantasyName: DataTypes.STRING,
    site: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    address: DataTypes.STRING,
    addressNumber: DataTypes.STRING,
    complement: DataTypes.STRING,
    municipality: DataTypes.STRING,
    district: DataTypes.STRING,
    state: DataTypes.STRING,
    contry: DataTypes.STRING,
    typePerson: DataTypes.INTEGER, //** 1- Propretário | 2- Cliente */
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'Person',
  });
  return Person;
};