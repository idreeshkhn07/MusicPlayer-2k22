const { check } = require("express-validator");

exports.validSignUp = [
  check("name", "First Name is required")
    .notEmpty()
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage("name must be between 4 to 32 characters"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 4,
    })
    .withMessage("Password must contain at least 4 characters")
    .matches(/\d/)
    .withMessage("password must contain a number"),
];

exports.validLogin = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 4,
    })
    .withMessage("Password must contain at least 4 characters")
    .matches(/\d/)
    .withMessage("password must contain a number"),
];

exports.addmusicValidator = [
  check("musicName")
    .not()
    .isEmpty()
    .withMessage("Song name is required")
    .isLength({ min: 3 })
    .withMessage("Songs name must be at least  3 characters long"),
  check("musicGenre")
    .not()
    .isEmpty()
    .withMessage("Song gerne should be declared"),
  check("musicDescription")
    .not()
    .isEmpty()
    .withMessage("Song description should be declared"),
  check("musicSinger")
    .not()
    .isEmpty()
    .isLength({ min: 4 })
    .withMessage("Siger name should be declared"),
];
