'use strict';

const { FORM_TABLE } = require('../models/form.model')
const { COMPANY_TABLE } = require('../models/company.model')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(FORM_TABLE, {
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
      companyId: {
        field: 'companyId',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        unique: true,
        references: {
          model: COMPANY_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(COMPANY_TABLE);
  }
};
