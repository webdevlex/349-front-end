import React from "react";
import "../styles/hero.css";
import heroImg from "../images/hero-img-tinted.jpg";
import { Link } from "react-router-dom";

// Hero component displays a hero section with a heading, sub-heading, and a sign-up button.
const Hero = () => {
	return (
		<div className="hero">
			{/* Hero content */}
			<div className="hero-content">
				<h1 className="hero-heading">FlickFix</h1> {/* Main heading */}
				<p className="hero-sub-heading">
					The Ultimate Movie Playlist Creator
				</p>{" "}
				{/* Sub-heading */}
				<div className="hero-buttons">
					{/* Sign-up button with a link to the signup page */}
					<Link to="/signup">
						<button className="hero-button hero-sign-up-button">Sign Up</button>
					</Link>
				</div>
			</div>

			{/* Hero image */}
			<div className="hero-wrapper">
				<div className="hero-gradient"></div> {/* Gradient overlay */}
				<img src={heroImg} alt="" className="hero-img" /> {/* Hero image */}
			</div>
		</div>
	);
};

export default Hero;
