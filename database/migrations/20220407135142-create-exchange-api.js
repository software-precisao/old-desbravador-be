'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('ExchangeApi', {
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
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      endPoint: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      credential: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      typeApi: {
        type: DataTypes.INTEGER, //** 1- Spot | 2- Futuro | 3- Margem */
        allowNull: false,
        validate: {
          min: 1,
          max: 3
        }
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN
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
    await queryInterface.dropTable('ExchangeApi');
  }
};