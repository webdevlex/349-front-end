import React from "react";
import "../styles/sign-form.css";
import Logo from "./Logo";

// SignForm component for rendering a form with a title and subheading.
const SignForm = ({ children, title, subheading }) => {
	return (
		<div className="sign-form">
			<Logo /> {/* Render the Logo component */}
			<h1 className="title">{title}</h1> {/* Render the title */}
			<h2 className="subheading">{subheading}</h2> {/* Render the subheading */}
			{children} {/* Render the children components */}
		</div>
	);
};

export default SignForm;
