const { addmusicValidator } = require("../helpers/valid");

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const upload = require("../middlewares/uploadMusic");

const {
  addMusicController,
  getAllmusics,
  DeleteThisMusic,
  getAllsingerName,
  getAccSingerSongs,
  getMusicAccLocation,
  getMusicAccTime,
  getTypeSearchMusics,
  getTypeSearchGerneMusics,
  getRandomMusics,
  getRecentMusics,

  MakefavSong,
  RmfavSong,
  myFavSongList,
  AddREcentlyPlayed,
  GetRecentlyPlayed,
  getMusicNotPlayed,
  MostlyLiked,
  MostlyPlayed,

  // playlist
  addtoPlaylist,
} = require("../controller/musicController");

// admin to upload music
router.post(
  "/addmusic",
  // upload.fields([
  //   { name: "thumbnail", maxCount: 1 },
  //   { name: "musicsrc", maxCount: 1 },
  // ]),
  addmusicValidator,
  addMusicController
);

// get all the songs
router.get("/allmusics", getAllmusics);

// delete the song by admin only
router.delete("/deletemusic/:id", DeleteThisMusic);

// get all the singers
router.get("/allsingers", getAllsingerName);

// songs of user selected singer
router.get("/singer/:text", getAccSingerSongs);

// songs according to location
router.get("/musicacclocation/:textlocation", getMusicAccLocation);

// songs according to time
router.get("/musicacctime/:timetext", getMusicAccTime);

// songs according to typed searched song
router.get("/music-typed-search-songs", getTypeSearchMusics);

// songs according to typed searched genre's songs
router.get("/music-typed-search-songs-genre", getTypeSearchGerneMusics);

// songs in random order
router.get("/random-musics", getRandomMusics);

// recent songs// or last 24 hours
router.get("/recentmusic", getRecentMusics);

// fav and unfav the music
router.put("/addtofavorite", authMiddleware, MakefavSong);
router.put("/removefromfavorite", authMiddleware, RmfavSong);

router.get("/myfavsongs", authMiddleware, myFavSongList);

// add recently played
router.put("/addtoprecently", authMiddleware, AddREcentlyPlayed);

// get recently played
router.get("/getrecplayedsongs", authMiddleware, GetRecentlyPlayed);

//  music that not listed yet
router.get("/getmusicnotplayed", authMiddleware, getMusicNotPlayed);

// toprated or mostly  liked song
router.get("/mostliked", MostlyLiked);

// toprated or mostly  played song
router.get("/mostplayed", MostlyPlayed);

// add to playlist
router.post("/add-playlist", authMiddleware, addtoPlaylist);
module.exports = router;
