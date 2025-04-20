const mongoose = require("mongoose");

const truckStatusSchema = new mongoose.Schema({
  truckId: {
    type: String,
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  driverNumber: {
    type: String,
    required: true,
  },
  startLocation: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  endLocation: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  currentLocation: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  weight: {
    type: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const TruckStatus = mongoose.model("TruckStatus", truckStatusSchema);

module.exports = TruckStatus;
