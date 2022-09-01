const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Audio = require('../cloudinary');
const checkAuth = require('../middlewares/authMiddleware');

const cloudinary = require('cloudinary').v2
import { cloudinary } from '../cloudinary';

router.post('/',(req,res,next) => {
    console.log(req.body);
    const file = req.files.audio;
    cloudinary.uploader.upload(file.tempFilePath,(err,result) => {
      console.log(result);
    })
  })