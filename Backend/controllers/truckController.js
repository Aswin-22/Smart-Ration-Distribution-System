const TruckStatus = require("../model/truckStatus");

const receiveTruckData = async (req, res) => {
  try {
    const { truckId, location, weight, timestamp } = req.body;

    if (
      !truckId ||
      !location ||
      !weight ||
      !location.latitude ||
      !location.longitude
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newStatus = new TruckStatus({
      truckId,
      location,
      weight,
      timestamp: timestamp || new Date(),
    });

    await newStatus.save();

    res.status(201).json({ message: "Truck data saved successfully" });
  } catch (error) {
    console.error("Error saving truck data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const verifyDisplay = async (req, res) => {
  res.json({ message: "hola raspbii" });
};


const getAllTruckStatuses = async (req, res) => {
  try {
    const trucks = await TruckStatus.find();
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching truck data" });
  }
};


module.exports = { receiveTruckData, verifyDisplay, getAllTruckStatuses };
