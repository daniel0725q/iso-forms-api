'use strict';

const { FORM_TEMPLATE_TABLE } = require('./../models/formTemplate.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(FORM_TEMPLATE_TABLE, 'company_id', {
      field: 'company_id',
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(FORM_TEMPLATE_TABLE, 'company_id');
  }
};
