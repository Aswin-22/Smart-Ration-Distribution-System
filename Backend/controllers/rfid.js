const Rfid = require("../model/rfid");

async function getAllRfids(req, res) {
  try {
    const rfids = await Rfid.find();
    res.json(rfids);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
}

async function handleNewRfid(req, res) {
  try {
    const newRfid = new Rfid({
      rfid: req.body.rfid,
      name: req.body.name,
      weight: req.body.weight,
      addedBy: req.user._id,
    });

    const data = await newRfid.save();

    req.io.emit("newRfid", newRfid);

    console.log("RFID data added successfully" + data);
    res.status(201).json({ message: "RFID data added successfully" });
  } catch (error) {
    console.error("Error adding RFID data:", error);
    res.status(500).json({ message: "Error adding RFID data" });
  }
}

async function updateLoadedAt(req, res) {
  const { id } = req.params;
  try {
    const rfid = await Rfid.findOne({ rfid: id });
    if (!rfid) return res.status(404).json({ message: "RFID not found" });

    if (rfid.loadedAt && userRole !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Unauthorized: Cannot modify loadedAt" });
    }

    rfid.loadedAt = new Date();
    rfid.loadedBy = req.user._id;
    const updatedRfid = await rfid.save();
    req.io.emit("updateLoadedAt", updatedRfid);
    res.json({ message: "Loaded time updated", rfid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateUnLoadedAt(req, res) {
  const { id } = req.params;
  try {
    const rfid = await Rfid.findOne({ rfid: id });
    if (!rfid) return res.status(404).json({ message: "RFID not found" });

    if (rfid.unloadedAt && userRole !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Unauthorized: Cannot modify unloadedAt" });
    }

    rfid.unLoadedAt = new Date();
    rfid.unloadedBy = req.user._id;
    const updatedRfid = await rfid.save();
    req.io.emit("updateLoadedAt", updatedRfid);
    res.json({ message: "UnLoaded time updated", rfid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getRfid(req, res) {
  const { id } = req.params;
  try {
    const rfid = await Rfid.findOne({ rfid: id });
    if (!rfid) return res.status(404).json({ message: "RFID not found" });
    res.json({ message: "Rfid Found", rfid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllRfids,
  handleNewRfid,
  updateLoadedAt,
  updateUnLoadedAt,
  getRfid,
};
