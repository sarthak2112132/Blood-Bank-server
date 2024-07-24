const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    if (user.role !== "admin") {
      return res.status(401).send({
        sucess: false,
        message: "Auth Failed",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Auth Failed in ADMIN MIDDLEWARE",
      error,
    });
  }
};
