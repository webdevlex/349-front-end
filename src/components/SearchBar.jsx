import React, { useState, useEffect } from "react";
import search from "../images/search-solid.svg";
import useMovieSearch from "../hooks/useMovieSearch";
import useDefaultMovie from "../hooks/useDefaultMovie";

const SearchBar = ({ setMovieResults, currentGenre }) => {
	const searchMovie = useMovieSearch(setMovieResults, currentGenre);
	const getDefaultMovie = useDefaultMovie(setMovieResults, currentGenre);
	const [searchValue, setSearchValue] = useState("");

	const handleSearchChange = (e) => {
		setSearchValue(e.target.value);
		if (e.target.value) {
			searchMovie(e.target.value);
		}
	};

	useEffect(() => {
		if (!searchValue) {
			getDefaultMovie();
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
