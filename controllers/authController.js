const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const {
      role,
      name,
      email,
      password,
      organisationName,
      hospitalName,
      website,
      address,
      phone,
    } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(201).send({
        message: "User Already Exists",
        success: false,
      });
    }
    const USER = await User.create({
      role,
      name,
      email,
      password,
      organisationName,
      hospitalName,
      website,
      address,
      phone,
    });
    return res.status(200).send({
      message: "Registered SuccessFully",
      success: true,
      USER,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in Registration",
      success: false,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        message: "User not Found",
        success: false,
      });
    }
    if (user.role !== req.body.role) {
      return res.status(500).send({
        message: "Role does not match",
        success: false,
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(201).send({
        message: "Invalid Credentials",
        success: false,
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      message: "Login SuccessFully",
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in Login Api",
      success: false,
    });
  }
};

const currentController = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    return res.status(200).send({
      message: "User fetched SuccessFully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in currentController",
      success: false,
    });
  }
};
module.exports = {
  registerController,
  loginController,
  currentController,
};
