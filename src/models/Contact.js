'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      Contact.belongsTo(models.Person, { foreignKey: 'personId' });
    }
  }
  Contact.init({
    personId: DataTypes.INTEGER,
    jobTitle: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    cellphone: DataTypes.STRING,
    homePhone: DataTypes.STRING,
    commercialPhone: DataTypes.STRING,
    branch: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'Contact',
  });
  return Contact;
};