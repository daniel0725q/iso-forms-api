'use strict';

const { DataTypes } = require('sequelize');
const { FORM_TEMPLATE_TABLE } = require('../models/formTemplate.model');
const { COMPANY_TABLE } = require('../models/company.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      formTemplateId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: FORM_TEMPLATE_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      paymentId: {
        allowNull: false,
        type: DataTypes.STRING
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING
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
    await queryInterface.dropTable('payments');
  }
};