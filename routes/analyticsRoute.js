const express = require("express");
const {
  bloodGroupDetailsController,
} = require("../controllers/analyticsController");
const router = express.Router();

router.route("/bloodGroup-data").post(bloodGroupDetailsController);
module.exports = router;
