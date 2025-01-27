'use strict';

const { DataTypes } = require('sequelize');
const { FORM_TEMPLATE_TABLE } = require('../models/formTemplate.model');
const { COMPANY_TABLE } = require('../models/company.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('payments', 'applied', {
      field: 'applied',
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('payments');
  }
};