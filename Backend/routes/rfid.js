const express = require("express");
const Rifd = require("../model/rfid");
const {
  getAllRfids,
  handleNewRfid,
  updateLoadedAt,
  updateUnLoadedAt,
  getRfid,
} = require("../controllers/rfid");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/getAll", authenticate, authorize(["ADMIN", "LOADER", "UNLOADER"]), getAllRfids);
router.post("/addNew", authenticate, authorize(["ADMIN", "LOADER"]), handleNewRfid);
router.put("/update-loadtime/:id", authenticate, authorize(["ADMIN", "LOADER"]), updateLoadedAt);
router.put("/update-unloadtime/:id", authenticate, authorize(["ADMIN", "UNLOADER"]), updateUnLoadedAt);
router.get("/getRfid/:id", authenticate, authorize(["ADMIN", "LOADER", "UNLOADER"]), getRfid);

module.exports = router;
