const express = require("express");

const app = express();

// app.use("/user", [rout-1,rout-2,[rout-3,rout-4],rout-5,rout-ect]);

app.use("/user", [
  (req, res, next) => {
    console.log("Handiling rout usage 1!");
    // res.send("1st Response");
    next();
  },
  [
    (req, res, next) => {
      console.log("Handiling rout usage 2!");
      // res.send("2nd Response");
      next();
    },
    (req, res, next) => {
      console.log("Handiling rout usage 3!");
      // res.send("2nd Response");
      next();
    },
    (req, res, next) => {
      console.log("Handiling rout usage 4!");
      // res.send("2nd Response");
      next();
    },
  ],
  (req, res, next) => {
    console.log("Handiling rout usage 5!");
    res.send("5th Response");
  },
]);

app.listen(1111, () => {
  console.log("Surver is succesufally listening to 1111");
});
