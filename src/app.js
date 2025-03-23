const express = require("express");

const app = express();

app.get(/^\/data\/[0-9]+$/, (req, res) => {
  res.send("this is working");
});

app.listen(1111, () => {
  console.log("Surver is succesufally listening to 1111");
});
