'use strict';
const { where } = require('sequelize');
const { ROLE_TABLE } = require('./../models/role.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Actualizamos los nombres de los roles existentes a español
    await queryInterface.bulkUpdate(ROLE_TABLE, 
      {
        name: 'Administrador',
       },
      { 
        id: 1
      }
    );

    await queryInterface.bulkUpdate(ROLE_TABLE, 
      {
        name: 'Operador'
       },
      {
        id: 2
      }
    );

    await queryInterface.bulkUpdate(ROLE_TABLE, 
      {
        name: 'Diligenciador'
       },
      {id: 3
      }
    );

    // Agregamos un nuevo rol llamado espectador
    await queryInterface.bulkInsert(ROLE_TABLE, [
      { name: 'Espectador'
       }
    ], {});
  },
};
