'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', [  
        {  
            name: "Иван Иванов",  
            email: "ivan.ivanov@example.com",  
            password: "password123"  
        },  
        {  
            name: "Мария Петрова",  
            email: "maria.petrova@example.com",  
            password: "securepass456"  
        },  
        {  
            name: "Алексей Смирнов",  
            email: "alexey.smirnov@example.com",  
            password: "mypassword789"  
        }  
    ], {});

  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Users', null, {});
  }
};
