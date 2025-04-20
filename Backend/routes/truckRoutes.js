const express = require("express");
const router = express.Router();
const {
  registerTruckData,
  verifyDisplay,
  getAllTruckStatuses,
  updateTruckLocation,
} = require("../controllers/truckController");

router.post("/data", registerTruckData);
router.get("/data", getAllTruckStatuses);
router.get("/", verifyDisplay);
router.put("/update-location", updateTruckLocation);

module.exports = router;
