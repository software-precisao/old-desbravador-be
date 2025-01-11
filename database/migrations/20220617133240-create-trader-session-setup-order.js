'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('TraderSessionOrder', {
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
      traderSessionCoinId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: { tableName: 'TraderSessionCoin' }, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      orderId: {
        type: DataTypes.STRING, 
        allowNull: false
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DOUBLE, 
        allowNull: false
      },
      origQty: {
        type: DataTypes.DOUBLE, 
        allowNull: false
      },
      executedQty: {
        type: DataTypes.DOUBLE, 
        allowNull: false
      },
      cumQty: {
        type: DataTypes.DOUBLE, 
        allowNull: false
      },
      activatePrice: {
        type: DataTypes.DOUBLE, 
        allowNull: false
      },
      priceRate: {
        type: DataTypes.DOUBLE, 
        allowNull: false
      },
      timeInForce: {
        type: DataTypes.STRING, 
        allowNull: false
      },
      type: {
        type: DataTypes.STRING, 
        allowNull: false
      },
      reduceOnly: {
        type: DataTypes.BOOLEAN, 
        allowNull: false
      },
      closePosition: {
        type: DataTypes.BOOLEAN, 
        allowNull: false
      },
      side: {
        type: DataTypes.STRING, 
        allowNull: false
      },
      positionSide: {
        type: DataTypes.STRING, 
        allowNull: false
      },
      stopPrice: {
        type: DataTypes.DOUBLE, 
        allowNull: false
      },
      workingType: {
        type: DataTypes.STRING, 
        allowNull: false
      },
      priceProtect: {
        type: DataTypes.BOOLEAN, 
        allowNull: false
      },
      origType: {
        type: DataTypes.STRING, 
        allowNull: false
      },
      updateTime: {
        type: DataTypes.STRING, 
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
    await queryInterface.dropTable('TraderSessionOrder');
  }
};