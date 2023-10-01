import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/menu.css";

const Menu = ({ currentSection, setCurrentSection }) => {
	const [auth, setAuth] = useContext(AuthContext);

	const menuItems = ["Popular", "Now Playing", "Search", "Upcoming"];

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
					onClick={() => setCurrentSection(menuItem)}>
					{menuItem}
				</li>
			))}
		</ul>
	);
};

export default Menu;
