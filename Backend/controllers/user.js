const User = require("../model/user");
const generateToken = require("../utils/generateToken");

async function handleGenerateNewUser(req, res) {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password, role });
    if (user) {
      console.log(user);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: "Error in registeration", user });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id, user.role);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function logOut(req, res) {
  try {
    res.clearCookie("jwt");
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = { handleGenerateNewUser, handleLogin, logOut };
