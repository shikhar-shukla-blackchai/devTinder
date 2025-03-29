const mongoose = require("mongoose");
const validator = require("validator");

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
        message: (props) => "PASSWOED IS TO WEEK " + props.value,
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
          throw new error("Gender data is not valid");
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

module.exports = mongoose.model("User", userSchema);
