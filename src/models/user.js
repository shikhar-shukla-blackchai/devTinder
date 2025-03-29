const mongoose = require("mongoose");

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
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
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
