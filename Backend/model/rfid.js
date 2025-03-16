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
  timestamp: { type: Date, default: Date.now },
});


const Rfid = mongoose.model("rfid", rfidSchema);
module.exports = Rfid;