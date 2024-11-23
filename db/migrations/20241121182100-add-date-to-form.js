'use strict';
const { where } = require('sequelize');
const { FORM_TABLE } = require('./../models/form.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(FORM_TABLE, 'created_date', {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
  },
};
