'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Contract', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      personId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: { tableName: 'Person' }, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      beginDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      dueDate: {
        type: DataTypes.INTEGER, //** dia do Mês */
        allowNull: false,
        validate: {
          min: 1,
          max: 31
        }
      },
      paymentForm: {
        type: DataTypes.INTEGER, //** 1- Moeda | 2- Boleto | 3- Cartão | 4- Depósito em conta | 5- Pix */
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      status: {
        type: DataTypes.BOOLEAN,
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
    await queryInterface.dropTable('Contract');
  }
};