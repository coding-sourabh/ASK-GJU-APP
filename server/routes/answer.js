const router = require("express").Router();
const AnswerModel = require("../models/Answer");

// save question to corresponding user

router.post("/addAnswer", async (req, res) => {
  //   console.log(req.body);

  // generate Date and time
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
    const newAnswer = new AnswerModel({
      user: {
        username: req.body.user.username,
        email: req.body.user.email,
        id: req.body.user.id,
      },
      questionID: req.body.questionID,
      answer: req.body.answer,
      answerTime: datetime,
    });

    // save this new Question and send response
    const ans = await newAnswer.save();

    res.status(200).json({
      result: "Successfully added answer :)",
      answer: ans.answer,
    });
  } catch (err) {
    res.status;
  }
});

// Fetch all answers return as response

router.post("/fetchAnswer", async (req, res) => {
  // console.log(req.body);
  try {
    // Fetch Answers
    const ans = await AnswerModel.find({ questionID: req.body.questionID });
    res.status(200).json({
      allAnswer: ans,
    });
  } catch (err) {
    res.status;
  }
});

module.exports = router;
