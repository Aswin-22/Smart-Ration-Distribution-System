const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["LOADER", "RCIEVER", "ADMIN"],
      default: "LOADER",
    },
  },
  { timestamps: true }
);

const User = model("user", userSchema);

module.exports = User;
