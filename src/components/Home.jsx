import React, { useState, useContext } from "react";
import NavBar from "./NavBar";
import Logo from "./Logo";

import "../styles/home.css";
import GenreFilter from "./GenreFilter";
import Menu from "./Menu";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";

const Home = () => {
	const [movieResults, setMovieResults] = useState([]);
	const [currentGenre, setCurrentGenre] = useState(null);
	const [currentSection, setCurrentSection] = useState("Search");

	return (
		<div className="home">
			<div className="menu">
				<div className="logo-padding">
					<Logo />
				</div>
				<Menu
					currentSection={currentSection}
					setCurrentSection={setCurrentSection}
					setMovieResults={setMovieResults}
				/>
			</div>
			<div className="main-content">
				<div className="nav">
					<NavBar
						setMovieResults={setMovieResults}
						currentGenre={currentGenre}
						currentSection={currentSection}
					/>
					{currentSection === "Search" && (
						<GenreFilter
							setCurrentGenre={setCurrentGenre}
							currentGenre={currentGenre}
						/>
					)}
					<h1 className="search-title">{currentSection}</h1>
				</div>

				<div className="results">
					{currentSection === "My Playlist" ? (
						<Playlist />
					) : (
						<SearchResults
							movieResults={movieResults}
							currentGenre={currentGenre}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
