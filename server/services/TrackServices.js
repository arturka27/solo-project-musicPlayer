const { Track } = require("../db/models");

class TrackServices {
  static createTrack = async ({ userId, title, artist, album, filePath } = {}) => {
    try {
      const track = await Track.create({
        userId,
        title,
        artist,
        album,
        filePath,
      });
      console.log("Трек добавлен");
      return track.get();
    } catch ({ message }) {
      console.log(message);
    }
  };

  static getAllTracks = async (query) => {
    try {
      const tracks = await Track.findAll({ where: query });
      return tracks ? tracks.map((track) => track.get()) : null;
    } catch ({ message }) {
      console.log(message);
    }
  };

  static getTrackById = async (id) => {
    try {
      const track = await Track.findByPk(id);
      return track ? track.get() : null;
    } catch ({ message }) {
      console.log(message);
    }
  };

  static updateTrack = async (data) => {
    const { id, userId, title, artist, album, filePath } = data;
    const track = await Track.findOne({ where: { id, userId } });
    if (track) {
      return track.update({
        title, artist, album, filePath
      });
    }
    return null;
  };

  static deleteTrack = async (id, userId) => {
    try {
      const track = await Track.destroy({ where: { id, userId } });
      return track;
    } catch ({ message }) {
      console.log(message);
    }
  };
}

module.exports = TrackServices;
