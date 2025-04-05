const express = require("express");
const profileRouts = express.Router();
const { userAuth } = require("../middlewares/auth");

profileRouts.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(500).send("ERROR : " + err.message);
  }
});

module.exports = profileRouts;
