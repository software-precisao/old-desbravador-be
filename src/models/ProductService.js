'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductService extends Model {
    static associate(models) {
      ProductService.hasMany(models.ContractProductService, { foreignKey: 'productServiceId' });
      ProductService.belongsTo(models.Person, { foreignKey: 'personId' });
    }
  }
  ProductService.init({
    personId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    monthPrice: DataTypes.DOUBLE,
    salesPrice: DataTypes.DOUBLE,
    priceYieldPercentage: DataTypes.DOUBLE,
    typeService: DataTypes.INTEGER, //** 1- Privado | 2- Comercial */
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'ProductService',
  });
  return ProductService;
};