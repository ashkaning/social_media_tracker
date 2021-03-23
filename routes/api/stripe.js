const router = require("express").Router();
const stripeController = require("../../controllers/stripeController");

router.route("/createSession")
    .post(stripeController.createSession)
module.exports = router;
