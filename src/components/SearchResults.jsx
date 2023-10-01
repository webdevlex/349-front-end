import React, { useEffect } from "react";
import "../styles/search-results.css";

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

const SearchResults = ({ movieResults, currentGenre }) => {
	useEffect(() => {
		console.log(movieResults);
	}, [movieResults]);

	return (
		<div className="search-section">
			<h1 className="search-title">Movies</h1>
			<div className="search-results">
				{movieResults.map((movie) => (
					<div className="result">
						<img
							loading="lazy"
							src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
							alt=""
						/>
						<p>Title: {movie.original_title}</p>
						<p>Description: {movie.overview}</p>
						<p>
							Genres:{" "}
							{movie.genre_ids.map((id) => (
								<span>{genres[id]}, </span>
							))}
						</p>
						<p>Popularity: {movie.popularity}</p>
						<p>Release: {movie.release_date}</p>
						<p>Vote Average: {movie.vote_average}</p>
						<p>Vote Count: {movie.vote_count}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default SearchResults;
