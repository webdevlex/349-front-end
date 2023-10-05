import React, { useState, useContext } from "react";
import heartSolid from "../images/heart-solid.svg";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/heart-button.css";

const HeartButton = ({ movie, movieMap, playlistIds }) => {
	const navigate = useNavigate();
	const [hoveringOverHeart, setHoveringOverHeart] = useState(false);
	const [auth, setAuth] = useContext(AuthContext);
	const [user, setUser] = useContext(UserContext);
	const movieIsInPlaylist = playlistIds.includes(movie.id);
	const [heartLoading, setHeartLoading] = useState(false);

	const toggleHeartHover = () => {
		setHoveringOverHeart((current) => !current);
	};

	const addMovieToPlaylist = async () => {
		const user = JSON.parse(localStorage.getItem("user"));
		const movieDetails = { ...movie, ...movieMap };

		const body = { movie: movieDetails, user_id: user.user_id };
		const options = {
			headers: {
				Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
			},
		};

		try {
			const updatedUser = await axios.post(
				"http://localhost:5000/api/users/add-movie-to-playlist",
				body,
				options
			);

			setUser(updatedUser.data);
		} catch (err) {
			console.log(err);
		}
		setHeartLoading(false);
	};

	const handleHeartClick = async () => {
		if (!movieIsInPlaylist) {
			if (auth) {
				setHeartLoading(true);
				addMovieToPlaylist();
			} else {
				navigate("/signin");
			}
		} else {
			console.log("unlike");
		}
	};

	return (
		<button
			onClick={handleHeartClick}
			className={`heart ${
				movieIsInPlaylist || heartLoading ? "red-heart" : "gray-heart"
			}`}
			onMouseOver={toggleHeartHover}
			onMouseOut={toggleHeartHover}>
			<img src={heartSolid} alt="" className="heart-icon" />
		</button>
	);
};

export default HeartButton;