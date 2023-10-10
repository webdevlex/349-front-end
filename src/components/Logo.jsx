import React from "react";
import { Link } from "react-router-dom";
import "../styles/logo.css";
import logo from "../images/logo.svg";

// Logo component displays the application logo and links to the search page.
const Logo = () => {
	return (
		<Link to="/search" className="logo-link">
			{" "}
			{/* Link to the search page */}
			<img src={logo} alt="logo" className="logo" /> {/* Application logo */}
		</Link>
	);
};

export default Logo;
