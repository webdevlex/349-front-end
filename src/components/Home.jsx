import React, { useState } from "react";
import NavBar from "./NavBar";
import Logo from "./Logo";

import "../styles/home.css";
import GenreFilter from "./GenreFilter";
import SearchResults from "./SearchResults";

const Home = () => {
	const [movieResults, setMovieResults] = useState([]);
	const [currentGenre, setCurrentGenre] = useState(null);

	return (
		<div className="home">
			<div className="menu">
				<Logo />
			</div>
			<div className="main-content">
				<NavBar setMovieResults={setMovieResults} currentGenre={currentGenre} />
				<GenreFilter
					setCurrentGenre={setCurrentGenre}
					currentGenre={currentGenre}
				/>
				<SearchResults
					movieResults={movieResults}
					currentGenre={currentGenre}
				/>
			</div>
		</div>
	);
};

export default Home;
