import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useMenuClick from "../hooks/useMenuClick";
import "../styles/menu.css";

const Menu = ({ currentSection, setCurrentSection, setMovieResults }) => {
	const getResults = useMenuClick(setMovieResults);
	const [auth, setAuth] = useContext(AuthContext);

	const menuItems = ["Search", "Trending", "Now Playing", "Upcoming"];

	const handleMenuItemClick = (menuItem) => {
		setCurrentSection(menuItem);
		if (menuItem !== "My Playlist") {
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
