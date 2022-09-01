import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentSong, SetCurrentSongIndex } from "../redux/userSlice";
// import { useDispatch } from 'react-redux'

function SongsList() {
  const { allSongs, currentSong , selectedPlaylist } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-5">
    <div className="pl-3 pr-6">
      <input
        type="text"
        placeholder="Song , Artist , Album , Genre"
        className="rounded w-full mx-3"
      />
      </div>
     <div className="overflow-y-scroll h-[54vh] p-2">
     {selectedPlaylist?.songs?.map((song , index) => {
        const isPlaying = currentSong?._id === song._id;
        return (
          <div
            className={`p-2 flex items-center justify-between cursor-pointer ${
              isPlaying && "shadow border border-gray-300 rounded"
            }`}
            onClick={() => {
              dispatch(SetCurrentSong(song));
              dispatch(SetCurrentSongIndex(index));
            }}
          >
            <div>
              <h1>{song.title}</h1>
              <h1>
                {song.artist} {song.artist} {song.year}
              </h1>
            </div>
            <div>
              <h1>{song.duration}</h1>
            </div>
          </div>
        );
      })}
     </div>
    </div>
  );
}

export default SongsList;
