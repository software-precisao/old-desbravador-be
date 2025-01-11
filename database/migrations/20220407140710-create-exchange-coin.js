'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('ExchangeCoin', {
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
       symbol: {
        type: DataTypes.STRING,
        allowNull: false
      },
      typeCoin: {
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
    await queryInterface.dropTable('ExchangeCoin');
  }
};