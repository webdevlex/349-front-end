import React from "react";
import { Link } from "react-router-dom";
import "../styles/logo.css";
import logo from "../images/logo.svg";

const Logo = () => {
	return (
		<Link to="/search" className="logo-link">
			<img src={logo} alt="logo" className="logo" />
		</Link>
	);
};

export default Logo;
