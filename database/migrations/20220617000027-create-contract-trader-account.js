'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('ContractTraderAccount', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      contractTraderId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: { tableName: 'ContractTrader' }, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      contractExchangeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: { tableName: 'ContractExchange' }, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      credential: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      walletName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      walletKeyHash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      keyAPIFuture: {
        type: DataTypes.STRING,
        allowNull: false
      },
      secretAPIFuture: {
        type: DataTypes.STRING,
        allowNull: false
      },
      keyAPISpot: {
        type: DataTypes.STRING,
        allowNull: false
      },
      secretAPISpot: {
        type: DataTypes.STRING,
        allowNull: false
      },
      typeAccount: {
        type: DataTypes.INTEGER, //** 1- Spot | 2- Futuro */
        allowNull: false,
        validate: {
          min: 1,
          max: 2
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
    await queryInterface.dropTable('ContractTraderAccount');
  }
};