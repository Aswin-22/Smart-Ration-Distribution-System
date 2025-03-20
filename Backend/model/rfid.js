const mongoose = require("mongoose");
const rfidSchema = mongoose.Schema({
  rfid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  arrivedAt: { type: Date, default: Date.now },
  loadedAt: { type: Date, default: null },
  unLoadedAt: { type: Date, default: null },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  loadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  unloadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const Rfid = mongoose.model("rfid", rfidSchema);
module.exports = Rfid;
