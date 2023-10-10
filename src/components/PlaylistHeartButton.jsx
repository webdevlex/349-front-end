import React, { useState, useContext, useRef } from "react";
import heartSolid from "../images/heart-solid.svg";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import useRemoveFromPlaylist from "../hooks/useRemoveFromPlaylist";
import "../styles/heart-button.css";

// PlaylistHeartButton component displays a heart button for playlist items.
const PlaylistHeartButton = ({ movie }) => {
	// React Router navigation
	const navigate = useNavigate();

	// State for tracking hover state
	const [hoveringOverHeart, setHoveringOverHeart] = useState(false);

	// Authentication context
	const [auth, setAuth] = useContext(AuthContext);

	// User context
	const [user, setUser] = useContext(UserContext);

	// Custom hook for removing a movie from the playlist
	const removeFromPlaylist = useRemoveFromPlaylist();

	// Check if the movie is in the user's playlist
	const movieIsInPlaylist = user?.playlistIds.includes(movie.id);

	// Reference for tracking loading state of the heart button
	const heartLoading = useRef(false);

	// Toggle hover state
	const toggleHeartHover = () => {
		setHoveringOverHeart((current) => !current);
	};

	// Handle heart button click
	const handleHeartClick = async () => {
		if (!heartLoading.current) {
			heartLoading.current = true;

			// Remove the movie from the playlist
			const userData = await removeFromPlaylist(
				movie.id,
				user.user_id,
				heartLoading
			);

			// Update the user context with the new user data
			setUser(userData);
		}
	};

	return (
		<button
			onClick={handleHeartClick}
			className={`heart ${movieIsInPlaylist ? "red-heart" : "gray-heart"}`}
			onMouseOver={toggleHeartHover}
			onMouseOut={toggleHeartHover}>
			<img src={heartSolid} alt="" className="heart-icon" /> {/* Heart icon */}
		</button>
	);
};

export default PlaylistHeartButton;
