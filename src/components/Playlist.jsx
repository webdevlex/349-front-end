import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import PlaylistMovie from "./PlaylistMovie";
import "../styles/playlist.css";

// Playlist component displays the user's playlist.
const Playlist = () => {
	// User context
	const [user, setUser] = useContext(UserContext);

	return (
		<div className="search-results">
			{user &&
				user.playlist.map((movie, index) => (
					<PlaylistMovie key={index} movie={movie} />
				))}{" "}
			{/* Map through and display playlist movies */}
		</div>
	);
};

export default Playlist;
