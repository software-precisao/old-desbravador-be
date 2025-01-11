'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('ExchangeTax', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      exchangeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: { tableName: 'Exchange' }, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      transaction: {
        type: DataTypes.STRING,
        allowNull: true
      },
      futureMaintenance: {
        type: DataTypes.STRING,
        allowNull: true
      },
      futureFundingFee: {
        type: DataTypes.STRING,
        allowNull: true
      },
      cashout: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
    await queryInterface.dropTable('ExchangeTax');
  }
};