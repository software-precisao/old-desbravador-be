'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('TraderSessionEvent', {
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
      symbol: {
        type: DataTypes.STRING,
        allowNull: false
      },
      payload: {
        type: DataTypes.STRING,
        allowNull: false
      },
      typeAction: {
        type: DataTypes.INTEGER, //** 1- Não comprou | 2- Comprou */
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
    await queryInterface.dropTable('TraderSessionEvent');
  }
};