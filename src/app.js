const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signin", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(500).send("ERROR : " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("connection request sent");
  res.send(user.firstName + " sent the connection request");
});

connectDB()
  .then(() => {
    console.log("Database connection established....");
    app.listen(1111, () => {
      console.log("Server is successfully listening on port 1111");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
