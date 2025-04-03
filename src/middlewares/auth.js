const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log("Cookies:", req.cookies); // Debugging: Check if token exists

    if (!token) {
      throw new Error("Token not Provided!!");
    }
    console.log("token :" + token);

    const decodeData = await jwt.verify(token, "SECRETkey@123");
    const { _id } = decodeData;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
};

module.exports = {
  userAuth,
};
