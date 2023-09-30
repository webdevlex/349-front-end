import React from "react";
import NavBar from "./NavBar";
import Logo from "./Logo";

import "../styles/home.css";

const Home = () => {
	return (
		<div className="home">
			<div className="menu">
				<Logo />
			</div>
			<div className="main-content">
				<NavBar />
			</div>
		</div>
	);
};

export default Home;
