const express = require("express");
const router = express.Router();
const {
  receiveTruckData,
  verifyDisplay,
  getAllTruckStatuses,
} = require("../controllers/truckController");

router.post("/data", receiveTruckData);
router.get("/data", getAllTruckStatuses);
router.get("/", verifyDisplay);

module.exports = router;
