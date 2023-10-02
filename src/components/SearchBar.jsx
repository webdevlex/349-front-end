import React, { useState, useEffect } from "react";
import search from "../images/search-solid.svg";
import useMovieSearch from "../hooks/useMovieSearch";
import useMenuClick from "../hooks/useMenuClick";

const SearchBar = ({ setMovieResults, currentGenre, currentSection }) => {
	const searchMovie = useMovieSearch(setMovieResults, currentGenre);
	const getResults = useMenuClick(setMovieResults);
	const [searchValue, setSearchValue] = useState("");

	const handleSearchChange = (e) => {
		setSearchValue(e.target.value);
		if (e.target.value) {
			searchMovie(e.target.value);
		}
	};

	useEffect(() => {
		if (!searchValue) {
			getResults(currentSection, currentGenre);
		}
	}, [searchValue, currentGenre]);

	useEffect(() => {
		if (searchValue) {
			searchMovie(searchValue);
		}
	}, [currentGenre]);

	return (
		<div className="search-bar">
			<img src={search} alt="magnifying glass" className="search-icon" />
			<input
				className="search-input"
				placeholder="Search"
				value={searchValue}
				onChange={(e) => handleSearchChange(e)}
			/>
		</div>
	);
};

export default SearchBar;
