import React from "react";
import "../styles/genre-filter.css";

// An array of genre objects containing id and name.
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
		id: 53,
		name: "Thriller",
	},
	{
		id: 10770,
		name: "TV Movie",
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

// GenreFilter component that takes in setCurrentGenre and currentGenre as props.
const GenreFilter = ({ setCurrentGenre, currentGenre }) => {
	// Function to handle genre click events.
	const handleGenreClick = (genre) => {
		// If the current genre is selected and the clicked genre is the same, set it to null.
		if (currentGenre && genre.name === currentGenre.name) {
			setCurrentGenre(null);
		} else {
			// Otherwise, set the clicked genre as the current genre.
			setCurrentGenre(genre);
		}
	};

	return (
		<div className="genre-container">
			{genres.map((genre) => (
				// Rendering GenreComponent for each genre in the genres array.
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

// GenreComponent functional component that displays a genre and handles clicks.
const GenreComponent = ({ genre, onClick, selected }) => {
	return (
		<div
			// Adding CSS classes based on whether the genre is selected.
			className={`genre-component ${selected ? "selected" : ""}`}
			onClick={onClick}>
			<p>{`${genre}`}</p>
		</div>
	);
};

// Exporting the GenreFilter component as the default export.
export default GenreFilter;
