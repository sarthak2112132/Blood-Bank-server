const express = require("express");
const {
  getDonarListController,
  getHospitalListController,
  getOrganisationListController,
  deleteDonarController,
} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router
  .route("/donar-list")
  .get(authMiddleware, adminMiddleware, getDonarListController);

router
  .route("/hospital-list")
  .get(authMiddleware, adminMiddleware, getHospitalListController);

router
  .route("/org-list")
  .get(authMiddleware, adminMiddleware, getOrganisationListController);

router
  .route("/delete-donar/:id")
  .delete(authMiddleware, adminMiddleware, deleteDonarController);
module.exports = router;
