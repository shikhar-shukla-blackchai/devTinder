const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Ha! it works?");
});
app.get("/jara", (req, res) => {
  res.send("Ja ra app.use nahi caleja");
});

app.get("/home", (req, res) => {
  res.send("Home path is also working");
});

app.listen(1111, () => {
  console.log("Surver is succesufally listening to 1111");
});
