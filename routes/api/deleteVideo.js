const router = require("express").Router();
const videoController = require("../../controllers/videoController");

router.route("/")
  .delete(videoController.deleteVideo)

module.exports = router;
