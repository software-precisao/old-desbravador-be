'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    static associate(models) {
      Contract.hasMany(models.ContractProductService, { foreignKey: 'contractId' });
      Contract.hasMany(models.ContractExchange, { foreignKey: 'contractId' });
      Contract.hasMany(models.ContractTrader, { foreignKey: 'contractId' });
      Contract.hasMany(models.ContractTrader, { foreignKey: 'contractId' });
      Contract.belongsTo(models.Person, { foreignKey: 'personId' });
    }
  }
  Contract.init({
    personId: DataTypes.INTEGER,
    beginDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    dueDate: DataTypes.INTEGER, //** dia do Mês */
    paymentForm: DataTypes.INTEGER, //** 1- Moeda | 2- Boleto | 3- Cartão | 4- Depósito em conta | 5- Pix */
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'Contract',
  });
  return Contract;
};