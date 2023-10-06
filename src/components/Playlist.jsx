import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import PlaylistMovie from "./PlaylistMovie";
import "../styles/playlist.css";

const Playlist = () => {
	const [user, setUser] = useContext(UserContext);

	return (
		<div className="search-results">
			{user.playlist.map((movie, index) => (
				<PlaylistMovie
					key={index}
					movie={movie}
					playlistIds={user.playlistIds}
				/>
			))}
		</div>
	);
};

export default Playlist;
