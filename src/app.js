const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/user", async (req, res) => {
  try {
    validateSignupData(req);

    const { firstName, lastName, password, emailId } = req.body;
    const passwordHash = await bcrypt.hash(password, 1);
    console.log(passwordHash);

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

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(500).send("Something Went Wrong");
  }
});

app.get("/user", async (req, res) => {
  const users = req.body._id.$oid;
  try {
    const user = await User.findById({ _id: users });
    if (!user) {
      res.status(500).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const deleteUser = req.body.userId;

  try {
    const user = await User.findByIdAndDelete({ _id: deleteUser });
    if (!user) {
      res.status(500).send("No user found by this name");
    } else {
      res.send("User deleted sucessufaly");
    }
  } catch (err) {
    res.status(500).send("User not found");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  console.log(data);
  try {
    // prettier-ignore
    const ALLOWED_UPDATES = ["userId","photoUrl","about","firstName","lastName","phone_No.","skills","gender","age"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      return res.status(400).send("Update not allowed");
    }

    if (data.skills.length > 10) {
      return res.status(500).send("Skills limets are 10");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(400).send("User not founfd");
    }
    res.send("User data update succefually");
  } catch (err) {
    res.status(500).send("Something went wrong " + err);
  }
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
