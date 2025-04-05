const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
