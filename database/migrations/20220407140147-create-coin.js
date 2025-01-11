'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Coin', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      rank : {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true
        }
      },
      blockChainNet: {
        type: DataTypes.STRING,
        allowNull: true
      },
      dateLaunched: {
        type: DataTypes.DATE,
        allowNull: true
      },
      decimalPlaces: {
        type: DataTypes.INTEGER,
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
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Coin');
  }
};