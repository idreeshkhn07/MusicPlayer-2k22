const mongoose = require("mongoose");

// music based on category
// -genre wise
// -on the home page with pop up model user have to select the type of music he want to listen
// then he will choose at least 3 type(by fav artist,by his moood and by gerne )
// default
// (top 10 of today)
// 10 category to show(at lest one should be play)
// at the time special vanera
// according to geolocation

const MusicSchema = new mongoose.Schema(
  {
    musicName: {
      type: String,
      required: true,
    },
    musicThumbnail: {
      type: String,
    },
    musicSrc: {
      type: String,
      //   required: true,
    },
    musicGenre: {
      type: String,
      required: true,
    },
    // songs according to location >> Where it is most famous
    musicAccLocation: {
      type: String,
    },
    // songs according to time >> Whenit is most listen
    musicAccTime: {
      type: String,
    },
    musicSinger: {
      type: String,
      required: true,
    },
    musicDescription: {
      type: String,
      required: true,
    },

    LikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    PlayedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Music", MusicSchema);
