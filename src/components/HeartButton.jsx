import React, { useState, useContext } from "react";
import heartSolid from "../images/heart-solid.svg";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import "../styles/heart-button.css";

const HeartButton = ({ movie, movieMap }) => {
	const [hoveringOverHeart, setHoveringOverHeart] = useState(false);
	const [auth, setAuth] = useContext(AuthContext);
	const [user, setUser] = useContext(UserContext);

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
	};

	const handleHeartClick = async () => {
		if (auth) {
			addMovieToPlaylist();
		} else {
		}
	};

	return (
		<button
			onClick={handleHeartClick}
			className="heart"
			onMouseOver={toggleHeartHover}
			onMouseOut={toggleHeartHover}>
			<img src={heartSolid} alt="" className="heart-icon" />
		</button>
	);
};

export default HeartButton;
