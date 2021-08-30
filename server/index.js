const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const questionRoute = require("./routes/question");
const answerRoute = require("./routes/answer");
const bodyParser = require("body-parser");
const cors = require("cors");

const DB =
  "mongodb+srv://skey:MyuyfnHiMIKYr1wH@cluster0.w89f4.mongodb.net/askGju?retryWrites=true&w=majority";
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 8800;

app.use("/api/user", userRoute);
app.use("/api/question", questionRoute);
app.use("/api/answer", answerRoute);

app.get("/", function (req, res) {
  res.send("<h1>Welcome to the backend :)</h1>");
});

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    return app.listen(PORT, (err) => {
      console.log("Connection established and Server running at 8800");
    });
  })
  .catch((err) => console.log(err));

//mongodb+srv://skey:Sourabh@123@cluster0.w89f4.mongodb.net/askGju?retryWrites=true&w=majority
