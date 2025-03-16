const express = require("express");
const User = require("../model/user");
const { handleGenerateNewUser, handleLogin } = require("../controllers/user");

const router = express.Router();

router.post("/signup", handleGenerateNewUser);

router.post("/signin", handleLogin);

module.exports = router;
