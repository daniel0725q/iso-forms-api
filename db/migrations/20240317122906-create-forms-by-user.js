'use strict';

const { FORM_TABLE } = require('../models/form.model')
const { COMPANY_TABLE } = require('../models/company.model')
const { USER_TABLE } = require('../models/user.model')
const { FORM_TEMPLATE_TABLE } = require('../models/formTemplate.model')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(FORM_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      formId: {
        field: 'form_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: FORM_TEMPLATE_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      data: {
        allowNull: false,
        type: Sequelize.DataTypes.JSON
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        unique: false,
        references: {
          model: USER_TABLE,
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
