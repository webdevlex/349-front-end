import React from "react";
import "../styles/hero.css";
import heroImg from "../images/hero-img-tinted.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
	return (
		<div className="hero">
			<div className="hero-content">
				<h1 className="hero-heading">FlickFix</h1>
				<p className="hero-sub-heading">The Ultimate Movie Playlist Creator</p>
				<div className="hero-buttons">
					<Link to="/signup">
						<button className="hero-button hero-sign-up-button">Sign Up</button>
					</Link>
				</div>
			</div>
			<div className="hero-wrapper">
				<div className="hero-gradient"></div>
				<img src={heroImg} alt="" className="hero-img" />
			</div>
		</div>
	);
};

export default Hero;
