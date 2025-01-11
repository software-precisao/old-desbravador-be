'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('ContractSetup', {
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
      setupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: { tableName: 'Setup' }, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
      {
        uniqueKeys: {
          ContractSetupId: {
            customIndex: true,
            fields: ['contractId', 'setupId']
          }
        }
      });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('ContractSetup');
  }
};