import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import search from "../images/search-solid.svg";

const NavBar = () => {
	return (
		<div className="navbar">
			<div className="search-bar">
				<img src={search} alt="magnifying glass" className="search-icon" />
				<input className="search-input" placeholder="Search"></input>
			</div>
			<ul className="auth-buttons">
				<li>
					<Link to="/signup" className="link">
						Sign Up
					</Link>
				</li>
				<li>
					<Link to="/signin" className="link">
						Sign In
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default NavBar;
