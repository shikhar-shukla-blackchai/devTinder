const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admine", adminAuth);

app.get("/admin", (req, res) => {
  console.log("admin rout");
  res.send("admin Auth is working");
});

app.get("/user", userAuth, (req, res) => {
  console.log("user rout");
  res.send("User auth is working");
});

app.listen(1111, () => {
  console.log("Surver is succesufally listening to 1111");
});
