'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Person', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      document: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fantasyName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      site: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true
        }
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      addressNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      complement: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      municipality: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contry: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      typePerson: {
        type: DataTypes.INTEGER, //** 1- Propretário | 2- Cliente */
        allowNull: false,
        validate: {
          min: 1,
          max: 2
        }
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
    await queryInterface.dropTable('Person');
  }
};