import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import heartSolid from "../images/heart-solid.svg";
import "../styles/heart-button.css";

import useRemoveFromPlaylist from "../hooks/useRemoveFromPlaylist";
import useAddToPlaylist from "../hooks/useAddToPlaylist";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";

// HeartButton component that handles adding/removing movies from a playlist.
const HeartButton = ({ movie, movieMap }) => {
	const navigate = useNavigate();

	const [hoveringOverHeart, setHoveringOverHeart] = useState(false);
	const heartLoading = useRef(false);

	const [auth, setAuth] = useContext(AuthContext);
	const [user, setUser] = useContext(UserContext);

	const removeFromPlaylist = useRemoveFromPlaylist();
	const addToPlaylist = useAddToPlaylist();
	const movieIsInPlaylist = user?.playlistIds.includes(movie.id);

	// Function to toggle the hover state of the heart button.
	const toggleHeartHover = () => {
		setHoveringOverHeart((current) => !current);
	};

	// Function to handle the click event on the heart button.
	const handleHeartClick = async () => {
		if (!heartLoading.current) {
			heartLoading.current = true; // Set the loading state to true to prevent multiple clicks

			if (!movieIsInPlaylist) {
				if (auth) {
					addToPlaylist(movie, movieMap); // If the movie is not in the playlist and the user is authenticated, add it.
				} else {
					navigate("/signin"); // If the user is not authenticated, navigate to the signin page.
				}
			} else {
				const userData = await removeFromPlaylist(
					movie.id,
					user.user_id,
					heartLoading
				); // If the movie is already in the playlist, remove it.

				setUser(userData); // Update the user context with the new user data
			}
		}
	};

	return (
		<button
			onClick={handleHeartClick}
			className={`heart ${
				movieIsInPlaylist || heartLoading.current ? "red-heart" : "gray-heart"
			}`}
			onMouseOver={toggleHeartHover}
			onMouseOut={toggleHeartHover}>
			<img src={heartSolid} alt="" className="heart-icon" />
			{/* Display the heart icon */}
		</button>
	);
};

export default HeartButton; // Export the HeartButton component as the default export.
