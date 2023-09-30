import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import search from "../images/search-solid.svg";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
	const navigate = useNavigate();
	const [auth, setAuth] = useContext(AuthContext);
	console.log(auth);

	const handleSignOut = () => {
		localStorage.removeItem("auth");
		localStorage.removeItem("user");
		setAuth(false);
		navigate("/signin");
	};

	return (
		<div className="navbar">
			<div className="search-bar">
				<img src={search} alt="magnifying glass" className="search-icon" />
				<input className="search-input" placeholder="Search"></input>
			</div>
			<ul className="auth-buttons">
				{auth ? (
					<li>
						<button type="button" className="link" onClick={handleSignOut}>
							Sign Out
						</button>
					</li>
				) : (
					<>
						<li>
							<Link to="/signin" className="link">
								Sign In
							</Link>
						</li>
						<li>
							<Link to="/signup" className="link">
								Sign Up
							</Link>
						</li>
					</>
				)}
			</ul>
		</div>
	);
};

export default NavBar;
