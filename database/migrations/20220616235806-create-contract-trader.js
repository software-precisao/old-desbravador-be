'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('ContractTrader', {
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
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: { tableName: 'User' }, key: 'id' },
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
    });
},
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('ContractTrader');
  }
};