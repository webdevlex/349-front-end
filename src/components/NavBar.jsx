import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import SearchBar from "./SearchBar";
import { AuthContext } from "../context/AuthContext";

const NavBar = ({ setMovieResults, currentGenre, currentSection }) => {
	const navigate = useNavigate();
	const [auth, setAuth] = useContext(AuthContext);

	const handleSignOut = () => {
		localStorage.removeItem("auth");
		localStorage.removeItem("user");
		setAuth(false);
		navigate("/signin");
	};

	return (
		<div className="navbar">
			{currentSection === "Search" && (
				<SearchBar
					setMovieResults={setMovieResults}
					currentGenre={currentGenre}
					currentSection={currentSection}
				/>
			)}
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
