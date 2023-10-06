import React, { useState, useEffect, useMemo } from "react";
import search from "../images/search-solid.svg";
import useMovieSearch from "../hooks/useMovieSearch";
import useMenuClick from "../hooks/useMenuClick";
import debouce from "lodash.debounce";

const SearchBar = ({ setMovieResults, currentGenre, currentSection }) => {
	const searchMovie = useMovieSearch(setMovieResults);
	const getResults = useMenuClick(setMovieResults);
	const [searchValue, setSearchValue] = useState("");

	const handleChange = (e, genre) => {
		setSearchValue(e.target.value);
		if (e.target.value) {
			searchMovie(e.target.value, genre);
		}
	};

	const debouncedResults = useMemo(() => {
		return debouce((e) => handleChange(e, currentGenre), 300);
	}, [currentGenre]);

	useEffect(() => {
		return () => {
			debouncedResults.cancel();
		};
	});

	useEffect(() => {
		if (!searchValue) {
			getResults(currentSection, currentGenre);
		}
	}, [searchValue, currentGenre]);

	useEffect(() => {
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
