const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      min: 6,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
