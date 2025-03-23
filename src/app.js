const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "shikhar", lastNmae: "shukla" });
});

app.post("/user", (req, res) => {
  // send data to da
  res.send("Data successfully save to the dataBase");
});

app.delete("/user", (req, res) => {
  res.send("Deleted successfully");
});

app.patch("/user", (req, res) => {
  res.send("Data updated succesfully in the data base");
});

app.use("/test", (req, res) => {
  console.log("Hellow form the server");
});

app.listen(1111, () => {
  console.log("Surver is succesufally listening to 1111");
});
