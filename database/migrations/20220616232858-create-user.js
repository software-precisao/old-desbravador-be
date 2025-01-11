'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('User', {
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
      familyName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      document: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sex: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: false
        }
      },
      cellphone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      changePassword: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      token2FA: {
        type: DataTypes.STRING,
        allowNull: false
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
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
          UserEmail: {
            customIndex: true,
            fields: ['personId', 'email']
          }
        }
      });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('User');
  }
};