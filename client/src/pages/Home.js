// import axios from "axios";
// import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Player from "../components/Player";
import Playlists from "../components/Playlists";
import SongsList from "../components/SongsList";
// import { ShowLoading, HideLoading } from "../redux/alertsSlice";
// import { SetAllSongs } from "../redux/userSlice";

function Home() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();


  return (
    <>
      <div className="flex gap-5 ">
        <div className="w-1/2">
          <SongsList />
        </div>
        <div className="w-1/2">
          <Playlists />
        </div>
      </div>
      <Player/>
    </>
  );
}

export default Home;
