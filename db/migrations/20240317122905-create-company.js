'use strict';

const { COMPANY_TABLE } = require('../models/company.model')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(COMPANY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.DataTypes.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      socialName: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: false,
      },
      logo: {
        allowNull: true,
        type: Sequelize.DataTypes.TEXT,
        unique: false,
      }
    });
    await queryInterface.bulkInsert(COMPANY_TABLE, [
      {
        id: 123456789,
        name: 'GSIntegral',
        socialName: 'GSIntegral',
        logo: null
     }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(COMPANY_TABLE);
  }
};
