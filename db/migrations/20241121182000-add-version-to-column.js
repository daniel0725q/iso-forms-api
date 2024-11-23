'use strict';
const { where } = require('sequelize');
const { FORM_TABLE } = require('./../models/form.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(FORM_TABLE, 'version', {
      field: 'version',
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: '1'
    });
  },
};
