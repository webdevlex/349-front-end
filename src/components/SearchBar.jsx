import React, { useState, useEffect, useMemo } from "react";
import search from "../images/search-solid.svg";
import useMovieSearch from "../hooks/useMovieSearch";
import useMenuClick from "../hooks/useMenuClick";
import debounce from "lodash.debounce";

// SearchBar component for searching movies.
const SearchBar = ({ setMovieResults, currentGenre, currentSection }) => {
	const searchMovie = useMovieSearch(setMovieResults);
	const getResults = useMenuClick(setMovieResults);
	const [searchValue, setSearchValue] = useState("");

	// Handle input change
	const handleChange = (e, genre) => {
		setSearchValue(e.target.value);
		if (e.target.value) {
			searchMovie(e.target.value, genre);
		}
	};

	// Debounce the handleChange function
	const debouncedResults = useMemo(() => {
		return debounce((e) => handleChange(e, currentGenre), 300);
	}, [currentGenre]);

	useEffect(() => {
		// Cleanup effect to cancel the debouncedResults
		return () => {
			debouncedResults.cancel();
		};
	});

	useEffect(() => {
		// Get results when search input is cleared
		if (!searchValue) {
			getResults(currentSection, currentGenre);
		}
	}, [searchValue, currentGenre]);

	useEffect(() => {
		// Search for movies when the genre changes
		if (searchValue) {
			searchMovie(searchValue, currentGenre);
		}
	}, [currentGenre]);

	return (
		<div className="search-bar">
			<img src={search} alt="magnifying glass" className="search-icon" />
			<input
				className="search-input"
				placeholder="Search"
				defaultValue=""
				onChange={debouncedResults}
			/>
		</div>
	);
};

export default SearchBar;
