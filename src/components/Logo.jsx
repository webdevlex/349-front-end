import React from "react";
import { Link } from "react-router-dom";
import "../styles/logo.css";
import logo from "../images/logo.svg";

const Logo = () => {
	return (
		<Link to="/" className="logo-link">
			<img src={logo} alt="logo" className="logo" />
		</Link>
	);
};

export default Logo;
