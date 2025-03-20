const express = require("express");
const User = require("../model/user");
const {
  handleGenerateNewUser,
  handleLogin,
  logOut,
} = require("../controllers/user");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", authenticate, async (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

router.post("/signup", handleGenerateNewUser);
router.post("/signin", handleLogin);
router.post("/logout", authenticate, logOut);

module.exports = router;
