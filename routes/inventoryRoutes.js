const express = require("express");
const {
  createInventoryController,
  getInventoryController,
  getDonorController,
  gethospitalController,
  getOrganisationController,
  getInventoryHospitalController,
  getOrganisationForHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");
const router = express.Router();

router.route("/create-inventory").post(createInventoryController);
router.route("/get-inventory/:id").get(getInventoryController);
router.route("/get-donors").post(getDonorController);
router.route("/get-hospital").post(gethospitalController);
router.post("/get-inventory-hospital", getInventoryHospitalController);

router.route("/get-organisation").post(getOrganisationController);
router.route("/get-recent-inventory").post(getRecentInventoryController);
router
  .route("/get-inventory-for-hospital")
  .post(getOrganisationForHospitalController);
module.exports = router;
