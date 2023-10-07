import React, { useState, useContext, useRef } from "react";
import heartSolid from "../images/heart-solid.svg";
import useRemoveFromPlaylist from "../hooks/useRemoveFromPlaylist";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { BackendUrlContext } from "../context/BackendUrlContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/heart-button.css";

const HeartButton = ({ movie, movieMap }) => {
	const navigate = useNavigate();
	const [hoveringOverHeart, setHoveringOverHeart] = useState(false);
	const [auth, setAuth] = useContext(AuthContext);
	const [user, setUser] = useContext(UserContext);
	const backendUrl = useContext(BackendUrlContext);
	const removeFromPlaylist = useRemoveFromPlaylist();
	const movieIsInPlaylist = user?.playlistIds.includes(movie.id);
	const heartLoading = useRef(false);

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
				`${backendUrl}/api/users/add-movie-to-playlist`,
				body,
				options
			);

			setUser(updatedUser.data);
		} catch (err) {
			console.log(err);
		}
		heartLoading.current = false;
	};

	const handleHeartClick = async () => {
		if (!heartLoading.current) {
			heartLoading.current = true;
			if (!movieIsInPlaylist) {
				if (auth) {
					addMovieToPlaylist();
				} else {
					navigate("/signin");
				}
			} else {
				const userData = await removeFromPlaylist(
					movie.id,
					user.user_id,
					heartLoading
				);
				setUser(userData);
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
		</button>
	);
};

export default HeartButton;
