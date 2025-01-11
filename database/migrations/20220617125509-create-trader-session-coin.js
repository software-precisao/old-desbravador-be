'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('TraderSessionCoin', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      traderSessionId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: { tableName: 'TraderSession' }, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false
      },
      percentageBudget: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      budgetValue: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      typePurchase: {
        type: DataTypes.INTEGER, //** 0- Não | 1- Sim | 3- Parada */
        allowNull: false
      },
      qtyPurchase: {
        type: DataTypes.INTEGER, 
        allowNull: false
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
    await queryInterface.dropTable('TraderSessionCoin');
  }
};