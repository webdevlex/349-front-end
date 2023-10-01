import React, { useState } from "react";
import NavBar from "./NavBar";
import Logo from "./Logo";

import "../styles/home.css";
import GenreFilter from "./GenreFilter";
import SearchResults from "./SearchResults";
import Menu from "./Menu";

const Home = () => {
	const [movieResults, setMovieResults] = useState([]);
	const [currentGenre, setCurrentGenre] = useState(null);
	const [currentSection, setCurrentSection] = useState("Search");

	let sectionToDisplay;
	switch (currentSection) {
		case "Search":
			sectionToDisplay = (
				<>
					<GenreFilter
						setCurrentGenre={setCurrentGenre}
						currentGenre={currentGenre}
					/>
					<SearchResults
						movieResults={movieResults}
						currentGenre={currentGenre}
					/>
				</>
			);
			break;
		case "Saved":
			sectionToDisplay = <h1>Saved</h1>;
			break;
		default:
			sectionToDisplay = <h1>No</h1>;
	}

	return (
		<div className="home">
			<div className="menu">
				<div className="logo-padding">
					<Logo />
				</div>
				<Menu
					currentSection={currentSection}
					setCurrentSection={setCurrentSection}
				/>
			</div>
			<div className="main-content">
				<NavBar setMovieResults={setMovieResults} currentGenre={currentGenre} />
				{sectionToDisplay}
			</div>
		</div>
	);
};

export default Home;
