const express = require("express");
const profileRouts = express.Router();
const { userAuth } = require("../middlewares/auth");
const model = require("mongoose");
const { validateProfileEditData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

profileRouts.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(500).send("ERROR : " + err.message);
  }
});

profileRouts.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      res.status(500).send("Error : " + "Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: loggedInUser.firstName + " Your Profile is updated successfully",
      data: loggedInUser,
    });
  } catch (err) {
    res.status(501).send("Error : " + err.message);
  }
});

profileRouts.patch("/profile/edit/password", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send("Old and new password is required");
    }
    const validateOldPassword = await loggedInUser.validatePassword(
      oldPassword
    );
    if (!validateOldPassword) {
      return res.status(500).send("Old password is incorrect");
    }

    const validateNewPassword = await loggedInUser.validatePassword(
      newPassword
    );

    if (!validateNewPassword) {
      return res.status(500).send("new password is week");
    }

    loggedInUser.password = await bcrypt.hash(newPassword, 10);

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser} your Password is updated successfully`,
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = profileRouts;
