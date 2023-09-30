import React from "react";
import NavBar from "./NavBar";
import Logo from "./Logo";

import "../styles/home.css";
import GenreFilter from "./GenreFilter";

const Home = () => {
	return (
		<div className="home">
			<div className="menu">
				<Logo />
			</div>
			<div className="main-content">
				<NavBar />
				<GenreFilter />
			</div>
		</div>
	);
};

export default Home;
