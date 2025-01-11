'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('TraderSessionSetup', {
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
      contractSetupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: { tableName: 'ContractSetup' }, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('TraderSessionSetup');
  }
};