'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('ProductService', {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      monthPrice: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      salesPrice: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      priceYieldPercentage: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      typeService: {
        type: DataTypes.INTEGER, //** 1- Privado | 2- Comercial */
        allowNull: true,
        validate: {
          min: 1,
          max: 2
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
    },
      {
        uniqueKeys: {
          ProductServiceName: {
            customIndex: true,
            fields: ['personId', 'name']
          }
        }
      });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('ProductService');
  }
};