const User = require("../models/userModel");
const mongoose = require("mongoose");
const Inventory = require("../models/inventoryModel");
const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }

    if (req.body.inventoryType === "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.organisation);

      const totalInOfRequestedBlood = await Inventory.aggregate([
        {
          $match: {
            inventoryType: "in",
            organisation,
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOutOfRequestedBlood = await Inventory.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBlood[0]?.total || 0;
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      const availableQuantityOfBlood = totalIn - totalOut;

      if (availableQuantityOfBlood < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityOfBlood}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }
    const inventory = new Inventory(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Record Added",
    });
  } catch (error) {
    console.log(error);
  }
};
const getInventoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const getInventory = await Inventory.find({ organisation: id }).populate(
      "donar"
    );
    return res.status(200).send({
      message: "ALL inventory are fetched",
      success: true,
      getInventory,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in getting fetch",
      success: false,
    });
  }
};

const getDonorController = async (req, res) => {
  try {
    const { organisation } = req.body;
    const donarId = await Inventory.distinct("donar", {
      organisation,
    });
    const user = await User.find({ _id: { $in: donarId } });

    return res.status(200).send({
      message: "Data Fetched SuccessFully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donor Records",
    });
  }
};

const gethospitalController = async (req, res) => {
  try {
    const { organisation } = req.body;
    const donarId = await Inventory.distinct("hospital", {
      organisation,
    });
    const user = await User.find({ _id: { $in: donarId } });

    return res.status(200).send({
      message: "Hospital Fetched SuccessFully",
      success: true,
      user,
    });
  } catch (error) {}
};
const getOrganisationController = async (req, res) => {
  try {
    const { donar } = req.body;
    const Organisation = await Inventory.distinct("organisation", {
      donar,
    });
    const user = await User.find({ _id: { $in: Organisation } });
    return res.status(200).send({
      message: "Organisation Fetched SuccessFully",
      success: true,
      user,
    });
  } catch (error) {}
};

const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await Inventory.find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get hospital comsumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get consumer Inventory",
      error,
    });
  }
};

const getOrganisationForHospitalController = async (req, res) => {
  try {
    const { hospital } = req.body;
    const Organisation = await Inventory.distinct("organisation", {
      hospital,
    });
    const user = await User.find({ _id: { $in: Organisation } });
    return res.status(200).send({
      message: "Organisation Fetched SuccessFully",
      success: true,
      user,
    });
  } catch (error) {}
};

const getRecentInventoryController = async (req, res) => {
  try {
    const organisation = new mongoose.Types.ObjectId(req.body.organisation);
    const inventory = await Inventory.find({
      organisation,
    })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Recent Transactions  Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Recent Inventory API",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonorController,
  gethospitalController,
  getOrganisationController,
  getInventoryHospitalController,
  getOrganisationForHospitalController,
  getRecentInventoryController,
};
