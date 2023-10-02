import React, { useState } from "react";
import Modal from "react-modal";
import star from "../images/star-solid.svg";
import heartOutline from "../images/heart-regular.svg";
import heartSolid from "../images/heart-solid.svg";

Modal.setAppElement("#root");

const genres = {
	28: "Action",
	12: "Adventure",
	16: "Animation",
	35: "Comedy",
	80: "Crime",
	99: "Documentary",
	18: "Drama",
	10751: "Family",
	14: "Fantasy",
	36: "History",
	27: "Horror",
	10402: "Music",
	9648: "Mystery",
	10749: "Romance",
	878: "Science Fiction",
	10770: "TV Movie",
	53: "Thriller",
	10752: "War",
	37: "Western",
};

const SearchResult = ({ movie }) => {
	const [showModal, setShowModal] = useState(false);
	const [hoveringOverHeart, setHoveringOverHeart] = useState(false);

	const handleModalOpen = () => {
		setShowModal(true);
	};

	const handleModalClose = () => {
		setShowModal(false);
	};

	const toggleHeartHover = () => {
		console.log("ha");
		setHoveringOverHeart((current) => !current);
	};

	return (
		<div className="result">
			<div className="result-img">
				<div className="shader"></div>
				<div
					className="heart"
					onMouseOver={toggleHeartHover}
					onMouseOut={toggleHeartHover}>
					<img src={heartSolid} alt="" className="heart-icon" />
				</div>
				<img
					loading="lazy"
					src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
					alt=""
					className="cover-img"
					onClick={handleModalOpen}
				/>
			</div>

			<div className="result-details">
				<div className="result-votes">
					<p className="result-avg">
						{movie.vote_average}
						<span className="out-of-10">/10</span>
					</p>
					<img src={star} alt="" className="star" />
				</div>
				<p className="result-title">{movie.original_title}</p>
				<p className="result-date">{movie.release_date.slice(0, 4)}</p>
			</div>

			<Modal
				isOpen={showModal}
				className="result-modal"
				style={{
					content: {
						backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
								url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
						backgroundSize: "cover",
					},
					overlay: {
						background: "rgba(0, 0, 0, 0.7)",
					},
				}}>
				<p>Title: {movie.original_title}</p>
				<p>Description: {movie.overview}</p>
				<p>
					Genres:{" "}
					{movie.genre_ids.map((id) => (
						<span key={id}>{genres[id]}, </span>
					))}
				</p>
				<p>Popularity: {movie.popularity}</p>
				<p>Release: {movie.release_date}</p>
				<button onClick={handleModalClose}>Close Modal</button>
			</Modal>
		</div>
	);
};

export default SearchResult;
