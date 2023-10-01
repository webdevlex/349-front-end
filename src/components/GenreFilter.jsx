import React, { useState } from "react";
import "../styles/genre-filter.css";

const genres = [
	{
		id: 28,
		name: "Action",
	},
	{
		id: 12,
		name: "Adventure",
	},
	{
		id: 16,
		name: "Animation",
	},
	{
		id: 35,
		name: "Comedy",
	},
	{
		id: 80,
		name: "Crime",
	},
	{
		id: 99,
		name: "Documentary",
	},
	{
		id: 18,
		name: "Drama",
	},
	{
		id: 10751,
		name: "Family",
	},
	{
		id: 14,
		name: "Fantasy",
	},
	{
		id: 36,
		name: "History",
	},
	{
		id: 27,
		name: "Horror",
	},
	{
		id: 10402,
		name: "Music",
	},
	{
		id: 9648,
		name: "Mystery",
	},
	{
		id: 10749,
		name: "Romance",
	},
	{
		id: 878,
		name: "Science Fiction",
	},
	{
		id: 10770,
		name: "TV Movie",
	},
	{
		id: 53,
		name: "Thriller",
	},
	{
		id: 10752,
		name: "War",
	},
	{
		id: 37,
		name: "Western",
	},
];

const GenreFilter = ({ setCurrentGenre, currentGenre }) => {
	const handleGenreClick = (genre) => {
		console.log(genre);
		if (currentGenre && genre.name === currentGenre.name) {
			setCurrentGenre(null);
		} else {
			setCurrentGenre(genre);
		}
	};

	return (
		<div className="genre-container">
			{genres.map((genre) => (
				<GenreComponent
					key={genre.id}
					genre={genre.name}
					selected={currentGenre && genre.name === currentGenre.name}
					onClick={() => handleGenreClick(genre)}
				/>
			))}
		</div>
	);
};

const GenreComponent = ({ genre, onClick, selected }) => {
	return (
		<div
			className={`genre-component ${selected ? "selected" : ""}`}
			onClick={onClick}>
			<p>{`${genre}`}</p>
		</div>
	);
};

export default GenreFilter;
