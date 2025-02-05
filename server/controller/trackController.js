const TrackServices = require('../services/TrackServices')
const upload = require("../utils/upload");

exports.getTracks = async (req, res) => {
  try {
    const tracks = await TrackServices.getAllTracks(req.query);
    
    res.status(200).json({ message: "success", tracks });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

exports.getOneTrack = async (req, res) => {
  try {
    // console.log('AAAAAAAAAAAAA', req.params, 11111111111);
    const { id } = req.params;
    const track = await TrackServices.getTrackById(id);
    res.status(200).json({message: 'success', track});
    return;
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

exports.addTrack = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const { title, artist, album } = req.body;
    const pathTrack = "/music/" + req.file.filename;

    const track = await TrackServices.createTrack({
      userId,
      title,
      artist,
      album,
      filePath: pathTrack,
    });

    res.status(201).json({ message: "success", track });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

exports.changeTrack = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const { id } = req.params;
    const { title, artist, album } = req.body;
    let track = await TrackServices.getTrackById(id);

    let pathTrack = track.filePath;

    if (req.file) {
      pathTrack = "/tracks/" + req.file?.filename;
    }
    if (track) {
      track = await TrackServices.updateTrack({
        id,
        userId,
        title,
        artist,
        album,
        filePath: pathTrack,
      });

      res.status(200).json({ message: "success", track });
      return;
    }
    res.status(400).json({ message: "Track is not found" });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

exports.destroyTrack = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = res.locals.user.id;
    let track = await TrackServices.getTrackById(id);
    if (track) {
      track = await TrackServices.deleteTrack(id, userId);
      res.status(200).json({ message: "success" });
      return;
    }
    res.status(400).json({ message: "Track is not found" });
  } catch ({ message }) {
    res.status(500).json({error: message });
  }
};


upload.single()