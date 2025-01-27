'use strict';

const { DataTypes } = require('sequelize');
const { COMPANY_TABLE } = require('../models/company.model');
const { USER_TABLE } = require('../models/user.model');
const { DIAGRAM_TABLE } = require('../models/diagram.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(DIAGRAM_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      companyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: COMPANY_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      xml: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('diagrams');
  }
};