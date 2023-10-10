import React, { useState, useContext, useEffect } from "react";
import "../styles/home.css";

import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import NavBar from "./NavBar";
import Logo from "./Logo";
import GenreFilter from "./GenreFilter";
import Menu from "./Menu";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";

// Home component is the main page of the application.
const Home = () => {
	// Authentication context
	const [auth, setAuth] = useContext(AuthContext);

	// React Router navigation
	const navigate = useNavigate();

	// State for movie search results, selected genre, and current section
	const [movieResults, setMovieResults] = useState([]);
	const [currentGenre, setCurrentGenre] = useState(null);
	const [currentSection, setCurrentSection] = useState("Search");

	// Check for authentication status, redirect to signin if not authenticated
	useEffect(() => {
		if (!auth) {
			navigate("/signin");
		}
	}, [auth]);

	return (
		<div className="home">
			<div className="menu">
				<div className="logo-padding">
					<Logo /> {/* Application logo */}
				</div>
				<Menu
					currentSection={currentSection}
					setCurrentSection={setCurrentSection}
					setMovieResults={setMovieResults}
				/>{" "}
				{/* Navigation menu */}
			</div>
			<div className="main-content">
				<div className="nav">
					<NavBar
						setMovieResults={setMovieResults}
						currentGenre={currentGenre}
						currentSection={currentSection}
					/>{" "}
					{/* Navigation bar */}
					{currentSection === "Search" && (
						<GenreFilter
							setCurrentGenre={setCurrentGenre}
							currentGenre={currentGenre}
						/>
					)}{" "}
					{/* Genre filter */}
					<h1 className="search-title">{currentSection}</h1>{" "}
					{/* Section title */}
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
				</div>{" "}
				{/* Display playlist or search results */}
			</div>
		</div>
	);
};

export default Home;
