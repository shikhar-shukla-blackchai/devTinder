const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 40,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      minLength: 9,
      maxLength: 10,
    },
    emailId: {
      type: String,

      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isStrongPassword(value),
        message: (props) => "PASSWORD IS TO WEAK " + props.value,
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,

      validate(value) {
        if (!["mail", "femail", "other"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://srv.carbonads.net/static/30242/4b723271609d12c16fec10ddea2ce78e9bba0517",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid url");
        }
      },
    },
    about: {
      type: String,
      default: "this is Default about Us form the User data ",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "SECRETkey@123", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
