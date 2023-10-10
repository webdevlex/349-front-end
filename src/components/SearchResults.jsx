import React from "react";
import SearchResult from "./SearchResult";
import "../styles/search-results.css";

// SearchResults component for displaying a list of movie search results.
const SearchResults = ({ movieResults }) => {
	return (
		<div className="search-section">
			<div className="search-results">
				{movieResults.map((movie, index) => (
					// Render a SearchResult component for each movie in the results
					<SearchResult key={index} movie={movie} />
				))}
			</div>
		</div>
	);
};

export default SearchResults;
