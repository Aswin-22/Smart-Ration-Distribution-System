const User = require("../model/user");

async function handleGenerateNewUser(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.status(201).redirect("/");
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (user.password !== password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
    return res.json({ success: true, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: `Server Error ${err}` });
  }
}

module.exports = { handleGenerateNewUser, handleLogin };
