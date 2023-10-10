import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/logo.css";
import logo from "../images/logo.svg";
import { AuthContext } from "../context/AuthContext";

// Logo component displays the application logo and links to the search page.
const Logo = () => {
	const [auth, setAuth] = useContext(AuthContext);

	return auth ? (
		<Link to="/search" className="logo-link">
			<img src={logo} alt="logo" className="logo" />
		</Link>
	) : (
		<img src={logo} alt="logo" className="logo" />
	);
};

export default Logo;
