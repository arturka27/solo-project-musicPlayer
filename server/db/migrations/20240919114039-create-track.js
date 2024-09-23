'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      title: {
        type: Sequelize.TEXT,
        allowNull:false,
        unique: true,
      },
      artist: {
        type: Sequelize.TEXT,
        defaultValue: 'Неизветный исполнитель'
      },
      album: {
        type: Sequelize.TEXT,
        defaultValue: ''
      },
      filePath: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      createdAt: {
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tracks');
  }
};