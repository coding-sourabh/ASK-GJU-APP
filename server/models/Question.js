const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    user: {
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
      id: {
        type: String,
        require: true,
      },
      photo: {
        type: String,
      },
    },

    question: {
      type: String,
      require: true,
      min: 5,
    },
    questionID: {
      type: String,
      require: true,
    },

    imageUrl: {
      type: String,
    },
    questionTime: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
