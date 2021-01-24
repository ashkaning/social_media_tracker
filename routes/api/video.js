const router = require("express").Router();
const videoController = require("../../controllers/videoController");

router.route("/")
  .post(videoController.saveVideo)
  .get(videoController.allVideos)


module.exports = router;
