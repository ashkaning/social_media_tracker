const router = require("express").Router();

//const log = require("./log")
const videoCategory = require("./videoCategory")
const video = require("./video")
////////////////////////////////////
//router.use("/logOut", log)
router.use("/videoCategory", videoCategory)
router.use("/video", video)
module.exports = router;
