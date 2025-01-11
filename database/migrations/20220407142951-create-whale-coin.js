'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('WhaleCoin', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      whaleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: { tableName: 'Whale' }, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      coinId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: { tableName: 'Coin' }, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      blockChainNet: {
        type: DataTypes.STRING,
        allowNull: true
      },
      balance: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      dtBalance: {
        type: DataTypes.DATE,
        allowNull: true
      },
      typeLastOperation: {
        type: DataTypes.INTEGER, //** 1- Entrando na Blockchain | 2- Saindo da Blockchain */
        allowNull: false,
        validate: {
          min: 1,
          max: 2
        }
      },
      dtLastOperation: {
        type: DataTypes.DATE,
        allowNull: true
      },
      originEntrance: {
        type: DataTypes.STRING,
        allowNull: true
      },
      originOutgoing: {
        type: DataTypes.STRING,
        allowNull: true
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
          WhaleCoinId: {
            customIndex: true,
            fields: ['whaleId', 'coinId']
          }
        }
      });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('WhaleCoin');
  }
};