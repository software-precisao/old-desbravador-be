'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Setup', {
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
      fantasyName: {
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
    },
    {
      uniqueKeys: {
        SetupNameFantasyName: {
          customIndex: true,
          fields: ['personId', 'name', 'fantasyName']
        }
      }
    });
},
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Setup');
  }
};