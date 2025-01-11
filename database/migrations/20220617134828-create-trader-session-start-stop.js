'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('TraderSessionStartStop', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      traderSessionId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: { tableName: 'TraderSession' }, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: DataTypes.INTEGER, //** 1- Start | 2- Stop */
        allowNull: false,
        validate: {
          min: 1, 
          max: 2  
        }
      },
      typeReason: {
        type: DataTypes.INTEGER, //** 1- Ação Externa | 2- Manual Trader */
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
    await queryInterface.dropTable('TraderSessionStartStop');
  }
};