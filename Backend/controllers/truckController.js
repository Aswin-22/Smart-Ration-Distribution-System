const TruckStatus = require("../model/truckStatus");

const registerTruckData = async (req, res) => {
  try {
    const { truckId, driverName, driverNumber, startLocation, endLocation } =
      req.body;

    if (
      !truckId ||
      !driverName ||
      !driverNumber ||
      !startLocation.latitude ||
      !startLocation.longitude ||
      !endLocation.latitude ||
      !endLocation.longitude
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTruck = new TruckStatus({
      truckId,
      driverName,
      driverNumber,
      startLocation,
      endLocation,
      timestamp: new Date(),
    });

    await newTruck.save();

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

async function updateTruckLocation(req, res) {
  const { truckId, currentLocation, weight } = req.body;

  try {
    const truck = await TruckStatus.findOneAndUpdate(
      { truckId },
      { currentLocation, weight },
      { new: true }
    );

    if (!truck) {
      return res
        .status(404)
        .json({ message: `Truck with number ${truckNumber} not found.` });
    }

    return res
      .status(200)
      .json({ message: `Location updated to ${truck.currentLocation}`, truck });
  } catch (error) {
    console.error("Error updating truck location:", error);
    return res
      .status(500)
      .json({ message: "Server error updating truck location." });
  }
}

module.exports = {
  registerTruckData,
  verifyDisplay,
  getAllTruckStatuses,
  updateTruckLocation,
};
