import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useMenuClick from "../hooks/useMenuClick";
import "../styles/menu.css";

// Menu component displays navigation menu items.
const Menu = ({ currentSection, setCurrentSection, setMovieResults }) => {
	// Custom hook for getting menu item results
	const getResults = useMenuClick(setMovieResults);

	// Authentication context
	const [auth, setAuth] = useContext(AuthContext);

	// Menu items
	const menuItems = ["Search", "Trending", "Now Playing", "Upcoming"];

	// Handle menu item click
	const handleMenuItemClick = (menuItem) => {
		setCurrentSection(menuItem);

		// Clear results and fetch new results if the selected menu item is different
		if (menuItem !== currentSection && menuItem !== "My Playlist") {
			setMovieResults([]);
			getResults(menuItem);
		}
	};

	return (
		<ul className="nav-menu">
			{menuItems.map((menuItem, index) => (
				<li
					key={index}
					className={`nav-menu-item ${
						currentSection === menuItem ? "selected-menu-item" : ""
					}`}
					onClick={() => handleMenuItemClick(menuItem)}>
					{menuItem}
				</li>
			))}
			{auth && (
				<div className="nav-playlist-item-wrapper">
					<li
						className={`nav-menu-item nav-playlist-item ${
							currentSection === "My Playlist" ? "selected-menu-item" : ""
						}`}
						onClick={() => handleMenuItemClick("My Playlist")}>
						My Playlist
					</li>
				</div>
			)}
		</ul>
	);
};

export default Menu;
