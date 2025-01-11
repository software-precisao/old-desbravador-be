'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('ContractProductService', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      contractId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: { tableName: 'Contract' }, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      productServiceId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: { tableName: 'ProductService' }, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      typeSignature: {
        type: DataTypes.INTEGER, //** 1- Mensal | 2- Percentual | 3- Compra */
        allowNull: false,
        validate: {
          min: 1,
          max: 3
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
},
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('ContractProductService');
  }
};