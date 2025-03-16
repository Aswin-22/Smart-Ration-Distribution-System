const express = require("express");
const Rifd = require("../model/rfid");
const { getAllRfids, handleNewRfid } = require("../controllers/rfid");

const router = express.Router();

router.get("/getAll", getAllRfids);
router.post("/addNew", handleNewRfid);

module.exports = router;
