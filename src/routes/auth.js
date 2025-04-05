const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signin", async (req, res) => {
  try {
    validateSignupData(req);

    const { firstName, lastName, password, emailId } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      password: passwordHash,
      emailId,
    });

    await user.save();

    res.send("User Data Uploaded successfully...");
  } catch (err) {
    res.status(500).send("Error : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 + 1000000),
      });

      return res.send("Login successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(500).send("Error : " + err.message);
  }
});
module.exports = authRouter;

/*
 * APP.USE === ROUTER.USE
 *
 * const app = express();
 * app.use("/test", authMiddleware, (req, res, next) => {});
 *
 * app.use('/', () => {}); === router.use('/', () => {});
 */
