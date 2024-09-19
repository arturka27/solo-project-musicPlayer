const router = require("express").Router();
const {
  getTracks,
  addTrack,
  getOneTrack,
  changeTrack,
  destroyTrack,
} = require("../controller/trackController");
const verifyAccessToken = require("../middleware/verifyAccessToken");
const upload = require("../utils/upload");

router
  .route("/")
  .get(getTracks)
  .post(verifyAccessToken, upload.single("track"), addTrack);
router
  .route("/:id")
  .get(getOneTrack)
  .put(verifyAccessToken, upload.single("track"), changeTrack)
  .delete(verifyAccessToken, destroyTrack);

module.exports = router;
