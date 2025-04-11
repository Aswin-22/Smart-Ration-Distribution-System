const mongoose = require("mongoose");

const truckStatusSchema = new mongoose.Schema({
  truckId: {
    type: String,
    required: true,
  },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  weight: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const TruckStatus = mongoose.model("TruckStatus", truckStatusSchema);

module.exports = TruckStatus;
