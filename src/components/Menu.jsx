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
		getResults(menuItem);
	};

	if (auth) {
		menuItems.push("Saved Movies");
	}

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
		</ul>
	);
};

export default Menu;
