const Music = require("../models/musicModel");

exports.addMusicController = async (req, res) => {
  // console.log("request come here");
  const newPost = {
    // musicSrc: req.files.musicsrc[0].filename,
    // musicThumbnail: req.files.thumbnail[0].filename,
    musicName: req.body.musicName,
    musicGenre: req.body.musicGenre,
    musicAccLocation: req.body.musicAccLocation,
    musicAccTime: req.body.musicAccTime,
    musicDescription: req.body.musicDescription,
    musicSinger: req.body.musicSinger,
  };
  const song = new Music(newPost);

  song.save((err, song) => {
    if (err) {
      return res.status(401).json({ msg: err });
    } else {
      res.json({
        success: true,
        post: song,
        message: "music added successfully",
      });
    }
  });
};

// response : all songs
exports.getAllmusics = async (req, res) => {
  console.log("req for all music");
  try {
    const allsongs = await Music.find({});
    return res.json(allsongs);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
};

// admin can delete the song
exports.DeleteThisMusic = async (req, res) => {
  const id = req.params.id;
  try {
    await Music.findByIdAndDelete(id).exec();
    res.status(200).json({ msg: "That music is successfully deleted" });
  } catch (error) {
    console.log(error);
  }
};

// response : all singers name
exports.getAllsingerName = async (req, res) => {
  console.log("req for all singers");
  try {
    const allsingers = await Music.find({}, "musicSinger");
    return res.json(allsingers);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
};

// response : all songs according to singer
exports.getAccSingerSongs = async (req, res) => {
  let query = req.params.text;
  try {
    const accsingersongs = await Music.find({
      musicSinger: query,
    });
    return res.json(accsingersongs);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
};

// response : all songs according to location
exports.getMusicAccLocation = async (req, res) => {
  let query = req.params.textlocation;
  try {
    const songsacclocation = await Music.find({
      musicAccLocation: query,
    });
    return res.json(songsacclocation);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
};

// response : all songs according to time
exports.getMusicAccTime = async (req, res) => {
  let query = req.params.timetext;
  try {
    const songsacctime = await Music.find({
      musicAccTime: query,
    });
    return res.json(songsacctime);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
};

// response : typed searched songname
exports.getTypeSearchMusics = (req, res) => {
  let songPattern = new RegExp("^" + req.body.query);
  Music.find({ songName: { $regex: songPattern } })

    .then((songMusic) => res.json({ songMusic }))
    .catch((err) => {
      console.log(err);
    });
};

// response : typed searched genre's songs
exports.getTypeSearchGerneMusics = (req, res) => {
  let searchedmusicgerne = req.body.query;
  Music.find({ musicGenre: searchedmusicgerne })

    .then((songsFromGerne) => res.json({ songsFromGerne }))
    .catch((err) => {
      console.log(err);
    });
};

// response :random songs
exports.getRandomMusics = async (req, res) => {
  try {
    const allrandommusics = await Music.aggregate([{ $sample: { size: 5 } }]);
    return res.json(allrandommusics);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
};

// response : all the songs uploaded in  last months(day)
exports.getRecentMusics = async (req, res) => {
  try {
    const allfocusedsongs = await Music.find({
      createdAt: { $gt: new Date(Date.now() - 24000 * 60 * 60 * 1000) }, //24 hours
    })
      .limit(5)
      .sort({ createdAt: -1 });
    return res.json(allfocusedsongs);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
};

// now add particular song to favourite and removing it
// MakefavSong
// RmfavSong

// response :add  by id from likedby array of perticular music
exports.MakefavSong = (req, res) => {
  console.log(
    "reuest by " + req.body.userId + " to make " + req.body.songId + " favorite"
  );
  Music.findByIdAndUpdate(
    req.body.songId,
    { $push: { LikedBy: req.body.userId } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
};

// response :remove by id from likedby array of perticular music
exports.RmfavSong = (req, res) => {
  console.log(
    "reuest by " +
      req.body.userId +
      " to remove from " +
      req.body.songId +
      " favorite"
  );
  Music.findByIdAndUpdate(
    req.body.songId,
    { $pull: { LikedBy: req.body.userId } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
};

// response : songs that contains my id in likedby array
exports.myFavSongList = (req, res) => {
  Music.find({
    LikedBy: {
      $in: [req.body.userId],
    },
  }).exec(function (error, Songs) {
    //  let users = !req.body.userId
    if (error)
      return res.status(500).json({
        errors: errorHandler(error),
      });
    else return res.status(200).json(Songs);
  });
};

// response : all musics that are recently played
exports.GetRecentlyPlayed = (req, res) => {
  Music.find({
    PlayedBy: {
      $in: [req.body.userId],
    },
  }).exec(function (error, Songs) {
    //  let users = !req.body.userId
    if (error)
      return res.status(500).json({
        errors: errorHandler(error),
      });
    else return res.status(200).json(Songs);
  });
};

// response :add my id to playedby array of perticular music
exports.AddREcentlyPlayed = (req, res) => {
  try {
    try {
      Music.findByIdAndUpdate(req.body.songId, {
        $pull: { PlayedBy: req.body.userId },
      });
      Music.findByIdAndUpdate(
        req.body.songId,
        { $push: { PlayedBy: req.body.userId } },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.json(result);
        }
      });
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(401).json("added to recently added", error);
  }
};

// response : songs not played
exports.getMusicNotPlayed = (req, res) => {
  Music.find({
    PlayedBy: {
      $nin: [req.body.userId],
    },
    // createdAt: { $gt: new Date(Date.now() - 50 * 60 * 60 * 1000) },
  }).exec(function (error, Songs) {
    //  let users = !req.body.userId
    if (error)
      return res.status(500).json({
        errors: errorHandler(error),
      });
    else return res.status(200).json(Songs);
  });
};

exports.MostlyLiked = (req, res) => {
  Music.find({
    // liked by contain 2 or more than 2 like
    "LikedBy.1": { $exists: true },
  }).exec(function (error, Songs) {
    return res.status(200).json(Songs);
  });
};

exports.MostlyPlayed = (req, res) => {
  Music.find({
    // played by contain 2 or more than 2 like
    "PlayedBy.2": { $exists: true },
  }).exec(function (error, Songs) {
    return res.status(200).json(Songs);
  });
};

//  yeise karo dure route ko vi
exports.addtoPlaylist= async(req,res)=>{
  try {
    const user = await User.findById(req.body.userId);
    const existingPlaylists = user.playlists;
    existingPlaylists.push({
      name: req.body.name,
      songs: req.body.songs,
    });
    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        playlists: existingPlaylists,
      },
      { new : true }
    );
    res.status(200).send({
      message: "Playlist created successfully ",
       success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating playlist",
      success: false,
      data: error,
    });
  }
};



