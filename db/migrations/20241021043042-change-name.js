'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Actualizamos los nombres de los roles existentes a español
    await queryInterface.bulkUpdate('Roles', 
      { name: 'administrador' }, 
      { name: 'admin' }
    );

    await queryInterface.bulkUpdate('Roles', 
      { name: 'operador' }, 
      { name: 'operator' }
    );

    await queryInterface.bulkUpdate('Roles', 
      { name: 'Diligenciador' }, 
      { name: 'signer' }
    );

    // Agregamos un nuevo rol llamado espectador
    await queryInterface.bulkInsert('Roles', [
      { name: 'espectador' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Revertimos los cambios a los nombres originales en inglés
    await queryInterface.bulkUpdate('Roles', 
      { name: 'admin' }, 
      { name: 'administrador' }
    );

    await queryInterface.bulkUpdate('Roles', 
      { name: 'operator' }, 
      { name: 'operador' }
    );

    await queryInterface.bulkUpdate('Roles', 
      { name: 'signer' }, 
      { name: 'Diligenciador' }
    );

    // Eliminamos el rol 'espectador'
    await queryInterface.bulkDelete('Roles', 
      { name: 'espectador' }
    );
  }
};
