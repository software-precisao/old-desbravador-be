'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('TraderSession', {
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
      contractTraderAccountId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: { tableName: 'ContractTraderAccount' }, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      beginDateSession: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endDateSession: {
        type: DataTypes.DATE,
        allowNull: false
      },
      allocatedPercentage: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      securityPercentage: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      allocatedValue: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      typeOrder: {
        type: DataTypes.INTEGER, //** 1- Trailing Stop | 2- The Market | 3- Limit */
        allowNull: false,
        validate: {
          min: 1,
          max: 3
        }
      },
      typeRisk: {
        type: DataTypes.DOUBLE, 
        allowNull: false
      },
      typeUseBalance: {
        type: DataTypes.INTEGER, //** 1- Não Fazer | 2- A Cada 4Hs | 2- A Cada 8Hs */
        allowNull: false,
        validate: {
          min: 1,
          max: 2
        }
      },
      typeRebalancing: {
        type: DataTypes.DOUBLE, 
        allowNull: false
      },
      typeSenseOrder: {
        type: DataTypes.INTEGER,  //** 1- Long | 2- Short | 2- Long Short */
        allowNull: false,
        validate: {
          min: 1,
          max: 3
        }
      },
      typeOrderManagement: {
        type: DataTypes.INTEGER, //** 1- Ilimitado | 2- Um | 3- Dois | 4- Três | 5- Quatro | 6- Cinco */
        allowNull: false,
        validate: {
          min: 1,
          max: 6
        }
      },
      typeMarketplace: {
        type: DataTypes.INTEGER, //** 1- Futuro Alavancado | 2- Futuro sem Alavancagem | 2- Spot */
        allowNull: false,
        validate: {
          min: 1,
          max: 3
        }
      },
      typeCurrencyGroup: {
        type: DataTypes.DOUBLE, 
        allowNull: false
      },
      typeDocker: {
        type: DataTypes.INTEGER, //** 0- No Start / Stop | 1- Start | 3- Stop */
        allowNull: false,
        validate: {
          min: 1,
          max: 3
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN       
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('TraderSession');
  }
};