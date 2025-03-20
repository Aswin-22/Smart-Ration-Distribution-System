const jwt = require("jsonwebtoken");

function generateToken(res, id, role) {
  const token = jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000, // 1Day
  });
}

module.exports = generateToken;
