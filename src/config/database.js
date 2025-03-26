const mangoose = require("mongoose");

const connectDB = async () => {
  await mangoose.connect(
    "mongodb+srv://dbNode:shikharshukla123@namastenode.bktopm2.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
