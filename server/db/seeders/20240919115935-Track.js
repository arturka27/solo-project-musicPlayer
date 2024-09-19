'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Tracks', [  
        {  
            title: "Трек 1",  
            artist: "Исполнитель 1",  
            album: "Альбом 1",  
            filePath: "/music/track1.mp3"  
        },  
        {  
            title: "Трек 2",  
            artist: "Исполнитель 2",  
            album: "Альбом 2",  
            filePath: "/music/track2.mp3"  
        },  
        {  
            title: "Трек 3",  
            artist: "Исполнитель 3",  
            album: "Альбом 3",  
            filePath: "/music/track3.mp3"  
        },  
        {  
            title: "Трек 4",  
            artist: "Исполнитель 4",  
            album: "Альбом 4",  
            filePath: "/music/track4.mp3"  
        },  
        {  
            title: "Трек 5",  
            artist: "Исполнитель 5",  
            album: "Альбом 5",  
            filePath: "/music/track5.mp3"  
        },  
        {  
            title: "Трек 6",  
            artist: "Исполнитель 6",  
            album: "Альбом 6",  
            filePath: "/music/track6.mp3"  
        },  
        {  
            title: "Трек 7",  
            artist: "Исполнитель 7",  
            album: "Альбом 7",  
            filePath: "/music/track7.mp3"  
        },  
        {  
            title: "Трек 8",  
            artist: "Исполнитель 8",  
            album: "Альбом 8",  
            filePath: "/music/track8.mp3"  
        },  
        {  
            title: "Трек 9",  
            artist: "Исполнитель 9",  
            album: "Альбом 9",  
            filePath: "/music/track9.mp3"  
        },  
        {  
            title: "Трек 10",  
            artist: "Исполнитель 10",  
            album: "Альбом 10",  
            filePath: "/music/track10.mp3"  
        }  
    ], {});

  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Tracks', null, {});
     
  }
};
