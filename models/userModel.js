const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "organisation", "donar", "hospital"],
    },
    name: {
      type: String,
      required: function () {
        if (this.role === "donar" || this.role === "admin") {
          return true;
        } else {
          return false;
        }
      },
    },
    organisationName: {
      type: String,
      required: function () {
        if (this.role === "organisation") {
          return true;
        }
        return false;
      },
    },
    hospitalName: {
      type: String,
      required: function () {
        if (this.role === "hospital") {
          return true;
        }
        return false;
      },
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    phone: {
      type: String,
      required: [true, "phoneNo is required"],
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) {
      next();
    }
    const genSaltVal = await bcrypt.genSalt(10);
    const hasshed_Password = await bcrypt.hash(user.password, genSaltVal);
    user.password = hasshed_Password;
  } catch (error) {
    next(error);
  }
});
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
