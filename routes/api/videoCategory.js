const router = require("express").Router();
const videoController = require("../../controllers/videoController");

router.route("/")
  .post(videoController.saveVideoCategory)
  .get(videoController.gettVideoCategory)


module.exports = router;
