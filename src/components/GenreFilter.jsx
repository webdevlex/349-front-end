import React, { useState } from "react";
import "../styles/genre-filter.css";

const GenreFilter = () => {
	const genres = [
		"Comedy", "Horror", "Fantastic", "Dramas", "Melodrama",
		"Detectives", "Thrillers", "Military", "Baby"
	];

	const [currentGenre, setCurrentGenre] = useState(null);

	const handleGenreClick = (genre) => {
		setCurrentGenre(genre);
	};


	return (
		<div className="genre-container" >
			{genres.map((genre) => (
				<GenreComponent key={genre} genre={genre}
					onClick={() => handleGenreClick(genre)} />
			))}
		</div>
	);
};

const GenreComponent = ({ genre, onClick }) => {
	return (
		<div className="genre-component" onClick={onClick} >
			<p>{`${genre}`}</p>
		</div>
	);
};

export default GenreFilter;
