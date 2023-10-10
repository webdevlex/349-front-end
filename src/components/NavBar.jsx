import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import SearchBar from "./SearchBar";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";

// NavBar component displays navigation and authentication buttons.
const NavBar = ({ setMovieResults, currentGenre, currentSection }) => {
	// React Router navigation
	const navigate = useNavigate();

	// Authentication context
	const [auth, setAuth] = useContext(AuthContext);

	// User context
	const [user, setUser] = useContext(UserContext);

	// Handle user sign-out
	const handleSignOut = () => {
		localStorage.removeItem("auth"); // Remove authentication token from local storage
		localStorage.removeItem("user"); // Remove user data from local storage
		setUser(null); // Clear the user context
		setAuth(false); // Update authentication status
		navigate("/signin"); // Navigate to the signin page
	};

	return (
		<div className="navbar">
			{currentSection === "Search" && (
				<SearchBar
					setMovieResults={setMovieResults}
					currentGenre={currentGenre}
					currentSection={currentSection}
				/>
			)}{" "}
			{/* Display search bar when in the "Search" section */}
			<ul className="auth-buttons">
				{auth ? ( // If authenticated, show "Sign Out" button
					<li>
						<button type="button" className="link" onClick={handleSignOut}>
							Sign Out
						</button>
					</li>
				) : (
					// If not authenticated, show "Sign In" and "Sign Up" links
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
