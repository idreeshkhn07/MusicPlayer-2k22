import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentSong, SetCurrentSongIndex } from "../redux/userSlice";

function Player() {
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const dispatch = useDispatch();
  const [ setIsPlaying] = useState(false);
  const audioRef = React.createRef();
  const { currentSong, currentSongIndex, allSongs , isPlaying  } = useSelector(
    (state) => state.user
  );

  const onPlay = () => {
    audioRef.current.play();
    dispatch (setIsPlaying(true));
  };

  const onPause = () => {
    audioRef.current.pause();
    dispatch (setIsPlaying(false));
  };

  const onPrev = () => {
    if(currentSongIndex !== 0) {
    dispatch(SetCurrentSongIndex(currentSongIndex - 1));
    dispatch(SetCurrentSong(allSongs[currentSongIndex - 1]));
    }
  };

  const onNext = () => {
    if(currentSongIndex !== allSongs.length - 1) {
    dispatch(SetCurrentSongIndex(currentSongIndex + 1));
    dispatch(SetCurrentSong(allSongs[currentSongIndex + 1]));
  }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    if (!currentSong && allSongs.length > 0) {
      dispatch(SetCurrentSong(allSongs[0]));
    }
  });

  return (
    <div className="bg-red-100 absolute bottom-0 left-0 right-0 p-5 shadow-lg border ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 w-96">
          <img
            className="h-20 w-32"
            src="https://cdn.dribbble.com/users/1365844/screenshots/15172963/applemusicedited1600x1200-2_4x.jpg"
            alt=""
          />
          <div>
            <h1>{currentSong?.title}</h1>
            <h1>
              {currentSong?.artist} , {currentSong?.album} , {currentSong?.year}{" "}
            </h1>
          </div>
        </div>

        <div className="w-96 flex flex-col items-center">
          <audio
            src={currentSong?.src}
            ref={audioRef}
            onTimeUpdate={(e) => {
              setCurrentTime(e.target.currentTime);
            }}
          ></audio>
          <div>
            <i className="ri-skip-back-fill text-4xl" onClick={onPrev}></i>
            {isPlaying ? (
              <i
                className="ri-pause-circle-line text-4xl"
                onClick={onPause}
              ></i>
            ) : (
              <i className="ri-play-circle-line text-4xl" onClick={onPlay}></i>
            )}

            <i className="ri-skip-forward-fill text-4xl" onClick={onNext}></i>
          </div>
          <div className="flex gap-3 items-center w-full">
            <h1>
              {Math.floor(currentTime / 60)} :{Math.floor(currentTime % 60)}
            </h1>
            <input
              type="range"
              className="p-0 w-full"
              min={0}
              max={Number(currentSong?.duration) * 60}
              value={currentTime}
              onChange={(e) => {
                audioRef.current.currentTime = e.target.value;
                setCurrentTime(e.target.value);
              }}
            />
            <h1>{currentSong?.duration}</h1>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <i className="ri-volume-mute-fill text-3xl" onClick={() => {
            setVolume(0);
            audioRef.current.volume = 0;
          }}
          ></i>
          <input
            type="range"
            className="p-0"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={(e) => {
              audioRef.current.volume = e.target.value;
              setVolume(e.target.value);
            }}
          />
          <i className="ri-volume-down-fill text-3xl" onClick={() => {
            setVolume(1);
            audioRef.current.volume = 1;
          }}></i>
        </div>
      </div>
      
    </div>
    
  );
}

export default Player;
