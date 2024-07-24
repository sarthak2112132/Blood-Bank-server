const Inventory = require("../models/inventoryModel");
const mongoose = require("mongoose");
const bloodGroupDetailsController = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const bloodGroupData = [];
    const organisation = new mongoose.Types.ObjectId(req.body.organisation);
    //get single blood Group
    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        const totalIn = await Inventory.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "in",
              organisation,
            },
          },
          {
            $group: {
              _id: "$bloodGroup",
              total: { $sum: "$quantity" },
            },
          },
        ]);
        //COunt TOTAL OUT
        const totalOut = await Inventory.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "out",
              organisation,
            },
          },
          {
            $group: {
              _id: "$bloodGroup",
              total: { $sum: "$quantity" },
            },
          },
        ]);
        const availableQuantityOfBlood =
          (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

        bloodGroupData.push({
          bloodGroup,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          availableQuantityOfBlood,
        });
      })
    );

    return res.status(200).send({
      success: true,
      message: "Blood Group Data fetched SuccessFully",
      bloodGroupData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in BloodAnalytics Controller",
    });
  }
};

module.exports = {
  bloodGroupDetailsController,
};
