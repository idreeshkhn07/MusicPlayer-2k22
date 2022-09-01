const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const { validSignUp, validLogin } = require("../helpers/valid");

// FOR REGISTER ROUTES
router.post("/register", validSignUp, async (req, res) => {
  try {
    const password = req.body.password;
    // Generate salt for bcrypt
    const salt = await bcrypt.genSaltSync(10);

    // Hasing password
    const hashedPassword = await bcrypt.hashSync(password, salt);
    req.body.password = hashedPassword;

    const user = new User(req.body);
    // await user.save()
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(200).send({ message: "User exists", success: false });
    } else {
      await user.save();
      return res
        .status(200)
        .send({ message: "User successfully registered", success: true });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
});

// FOR LOGIN ROUTES
router.post("/login", validLogin, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const passwordMatched = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (passwordMatched) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "2d",
      });
      return res.status(200).send({
        message: "User Logged in successfully",
        success: true,
        data: token,
      });
    } else {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
});

// TO GET USER DATA
router.post("/get-user-data", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.password = undefined;
    return res.status(200).send({
      message: "User data fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
});
module.exports = router;
