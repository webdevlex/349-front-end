import React, { useState } from "react";
import HeartButton from "./HeartButton";
import PlaylistHeartButton from "./PlaylistHeartButton";
import star from "../images/star-solid.svg";
import Modal from "react-modal";

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

const PlaylistMovie = ({ movie, playlistIds }) => {
	const [showModal, setShowModal] = useState(false);

	const handleModalOpen = () => {
		setShowModal(true);
	};

	const handleModalClose = () => {
		setShowModal(false);
	};

	return (
		<div className="result">
			<div className="result-img">
				<div className="shader"></div>
				<PlaylistHeartButton movie={movie} playlistIds={playlistIds} />
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
					overlay: {
						background: "rgba(0, 0, 0, 0.7)",
					},
				}}>
				<img
					className="modal-img"
					src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
					alt=""
				/>
				<div className="modal-bottom">
					<p className="modal-title">{movie.original_title}</p>
					<p className="modal-text">
						{movie["contentRating"]}
						&nbsp; | &nbsp;
						{Math.floor(movie["runtime"] / 60)} Hours {movie["runtime"] % 60}{" "}
						Min &nbsp; | &nbsp;
						{movie.genre_ids.map((id, index) => (
							<span key={id}>
								{genres[id]}
								{index !== movie.genre_ids.length - 1 ? ", " : ""}
							</span>
						))}
						&nbsp; | &nbsp;
						{movie.release_date}
					</p>
					<p>{movie.overview}</p>
					<p>Director: {movie["directors"]}</p>
					<p>Budget: ${movie["budget"]}</p>
					<button onClick={handleModalClose}>Close Modal</button>
				</div>
			</Modal>
		</div>
	);
};

export default PlaylistMovie;
