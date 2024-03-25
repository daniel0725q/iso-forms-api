'use strict';

const { FORM_TEMPLATE_TABLE } = require('../models/formTemplate.model')
const { COMPANY_TABLE } = require('../models/company.model')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(FORM_TEMPLATE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      version: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      form: {
        allowNull: false,
        type: Sequelize.DataTypes.JSON
      },
      title: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      code: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      type: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(COMPANY_TABLE);
  }
};
