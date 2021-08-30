const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "some very secret key";

function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

// Resister user

router.post("/register", async (req, res) => {
  console.log(req);
  try {
    // encrypted password generation
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Creating new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      photo: req.body.photo,
    });

    // save this new user and send response
    const user = await newUser.save();

    // token generation
    const token = generateToken(user);

    res.status(200).json({
      token: token,
      username: user.username,
      email: user.email,
      photo: user.photo,
      id: user._id,
    });
  } catch (err) {
    res.status;
  }
});

// Login User

router.post("/login", async (req, res) => {
  console.log("hello", req.body);
  try {
    //find user
    const user = await User.findOne({ username: req.body.username });

    !user && res.status(400).json("Wrong username or password");
    console.log(user);
    //decrypt password
    const decryptedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    !decryptedPassword && res.status(400).json("wrong username and password");

    // token generation
    const token = generateToken(user);

    // send id and username if user succcesfully entered valid credentials
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      photo: null,
      token: token,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
