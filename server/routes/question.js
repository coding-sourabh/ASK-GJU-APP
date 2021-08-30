const router = require("express").Router();
const QuestionModel = require("../models/Question");
// import { v4 as uuidv4 } from "uuid";

// save question to corresponding user
router.post("/addQuestion", async (req, res) => {
  //   console.log(req.body);

  // Generate data and time
  let currentdate = new Date();
  let datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  try {
    // Creating new question
    const newQuestion = new QuestionModel({
      user: {
        username: req.body.user.username,
        email: req.body.user.email,
        password: req.body.user.password,
        id: req.body.user.id,
        photo: req.body.user.photo,
      },
      question: req.body.question,
      questionID: req.body.questionID,
      imageUrl: req.body.imageUrl,
      questionTime: datetime,
      active: req.body.active,
    });

    // save this new Question and send response
    const ques = await newQuestion.save();

    res.status(200).json({
      result: "Successfully added question :)",
    });
  } catch (err) {
    res.status;
  }
});

// Fetch all question return as response

router.post("/fetchQuestions", async (req, res) => {
  try {
    // Fetch Questions
    const ques = await QuestionModel.find();
    ques.sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json({
      allQuestions: ques,
    });
  } catch (err) {
    res.status;
  }
});

module.exports = router;