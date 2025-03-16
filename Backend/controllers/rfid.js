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

module.exports = { getAllRfids, handleNewRfid };
