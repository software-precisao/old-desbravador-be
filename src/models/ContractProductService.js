'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractProductService extends Model {
    static associate(models) {
      ContractProductService.belongsTo(models.Contract, { foreignKey: 'contractId' });
      ContractProductService.belongsTo(models.ProductService, { foreignKey: 'productServiceId' });
    }
  }
  ContractProductService.init({
    contractId: DataTypes.INTEGER,
    productServiceId: DataTypes.INTEGER,
    typeSignature: DataTypes.INTEGER, //** 1- Mensal | 2- Percentual | 3- Compra */
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'ContractProductService',
  });
  return ContractProductService;
};