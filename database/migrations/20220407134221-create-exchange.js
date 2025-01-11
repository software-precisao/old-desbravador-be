'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Exchange', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true
        }
      },
      whatsapp: {
        type: DataTypes.STRING,
        allowNull: true
      },
      telegram: {
        type: DataTypes.STRING,
        allowNull: true
      },
      twitter: {
        type: DataTypes.STRING,
        allowNull: true
      },
      leverage: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      minLeverageDegree: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      maxLeverageDegree: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      volatilityTransactions: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      volatilityBusiness: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      namePayPalAccount: {
        type: DataTypes.STRING,
        allowNull: true
      },
      hashPayPalAccount: {
        type: DataTypes.STRING,
        allowNull: true
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true
        }
      },
      urlTest: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true
        }
      },
      typeExchange: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 2
        }
      },
      dateLaunched: {
        type: DataTypes.DATE,
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
    await queryInterface.dropTable('Exchange');
  }
};