const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Data successfully...");
  } catch (err) {
    res.status(500).send("Error saving the user" + err.message);
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
