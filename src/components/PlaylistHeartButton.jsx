import React, { useState, useContext } from "react";
import heartSolid from "../images/heart-solid.svg";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import useRemoveFromPlaylist from "../hooks/useRemoveFromPlaylist";
import "../styles/heart-button.css";

const PlaylistHeartButton = ({ movie, playlistIds }) => {
	const navigate = useNavigate();
	const [hoveringOverHeart, setHoveringOverHeart] = useState(false);
	const [auth, setAuth] = useContext(AuthContext);
	const [user, setUser] = useContext(UserContext);
	const removeFromPlaylist = useRemoveFromPlaylist();
	const movieIsInPlaylist = playlistIds.includes(movie.id);

	const toggleHeartHover = () => {
		setHoveringOverHeart((current) => !current);
	};

	const handleHeartClick = async () => {
		const userData = await removeFromPlaylist(movie.id, user.user_id);
		setUser(userData);
	};

	return (
		<button
			onClick={handleHeartClick}
			className={`heart ${movieIsInPlaylist ? "red-heart" : "gray-heart"}`}
			onMouseOver={toggleHeartHover}
			onMouseOut={toggleHeartHover}>
			<img src={heartSolid} alt="" className="heart-icon" />
		</button>
	);
};

export default PlaylistHeartButton;
