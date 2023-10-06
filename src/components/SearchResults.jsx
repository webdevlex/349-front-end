import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import SearchResult from "./SearchResult";
import "../styles/search-results.css";

const SearchResults = ({ movieResults, currentGenre }) => {
	const [user, setUser] = useContext(UserContext);

	useEffect(() => {
		console.log(movieResults);
	}, [movieResults]);

	return (
		<div className="search-section">
			<div className="search-results">
				{movieResults.map((movie, index) => (
					<SearchResult
						key={index}
						movie={movie}
						playlistIds={user.playlistIds}
					/>
				))}
			</div>
		</div>
	);
};

export default SearchResults;
