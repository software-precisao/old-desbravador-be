'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('ExchangeBank', {
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
      bankName: {
          type: DataTypes.STRING,
          allowNull: true
      },
      bankCode: {
          type: DataTypes.STRING,
          allowNull: true
      },
      agencyCode: {
          type: DataTypes.STRING,
          allowNull: true
      },
      accountCode: {
          type: DataTypes.STRING,
          allowNull: true
      },
      accountNum: {
          type: DataTypes.STRING,
          allowNull: true
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
    },
    {
      uniqueKeys: {
        ExchangeBankName: {
          customIndex: true,
          fields: ['exchangeId', 'bankName']
        }
      }
    });
},
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('ExchangeBank');
  }
};