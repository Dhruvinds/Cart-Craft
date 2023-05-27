const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const sc = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    role: {
      type: ObjectId,
      ref: "Role",
    },
    password: {
      type: String,
    },
    confirmPassword: {
      type: String,
    },
    tokenstatus: {
      type: String,
      default: "",
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("user", sc);
module.exports = User;
