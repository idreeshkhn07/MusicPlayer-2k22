const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "thumbnail") {
      cb(null, "./media/thumbnail");
    } else if (file.fieldname == "musicsrc") {
      cb(null, "./media/musicsrc");
    }
  },

  filename: function (req, file, cb) {
    cb(null, new Date().toString() + file.originalname);
  },
});

// rejecting and accepting file.
const fileFilter = (req, file, cb) => {
  if (file.fieldname == "thumbnail") {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else if (file.fieldname == "musicsrc") {
    console.log(file.mimetype);
    if (file.mimetype === "audio/mpeg" || file.mimetype === "audio/x-mpeg-3") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
};

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 1024 * 1024 * 15, // 13 mb
  },

  fileFilter: fileFilter,
});

module.exports = upload;
