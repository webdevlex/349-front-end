import React, { useEffect } from "react";
import SearchResult from "./SearchResult";
import "../styles/search-results.css";

const SearchResults = ({ movieResults, currentGenre }) => {
	useEffect(() => {
		console.log(movieResults);
	}, [movieResults]);

	return (
		<div className="search-section">
			<div className="search-results">
				{movieResults.map((movie, index) => (
					<SearchResult key={index} movie={movie} />
				))}
			</div>
		</div>
	);
};

export default SearchResults;
