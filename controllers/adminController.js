const User = require("../models/userModel");
const getDonarListController = async (req, res) => {
  try {
    const donarData = await User.find({ role: "donar" }).sort({
      createdAt: -1,
    });
    return res.status(200).send({
      success: true,
      donarData,
      totalCount: donarData.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in donar list Api",
      error,
    });
  }
};
const getHospitalListController = async (req, res) => {
  try {
    const hospitalData = await User.find({ role: "hospital" }).sort({
      createdAt: -1,
    });
    return res.status(200).send({
      success: true,
      hospitalData,
      totalCount: hospitalData.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in hospital list Api",
      error,
    });
  }
};
const getOrganisationListController = async (req, res) => {
  try {
    const OrganisationData = await User.find({ role: "organisation" }).sort({
      createdAt: -1,
    });
    return res.status(200).send({
      success: true,
      OrganisationData,
      totalCount: OrganisationData.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Organisation list Api",
      error,
    });
  }
};
const deleteDonarController = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: " Record Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting ",
      error,
    });
  }
};
module.exports = {
  getDonarListController,
  getHospitalListController,
  getOrganisationListController,
  deleteDonarController,
};
