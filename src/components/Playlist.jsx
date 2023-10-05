import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Playlist = () => {
	const [user, setUser] = useContext(UserContext);

	return (
		<div>
			{user.playlists.map((item) => (
				<p>{JSON.stringify(item)}</p>
			))}
		</div>
	);
};

export default Playlist;
