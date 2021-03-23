const router = require("express").Router();

//const log = require("./log")
const videoCategory = require("./videoCategory")
const video = require("./video")
const stripe = require("./stripe")
////////////////////////////////////
//router.use("/logOut", log)
router.use("/videoCategory", videoCategory)
router.use("/video", video)
router.use("/stripe", stripe)
module.exports = router;
