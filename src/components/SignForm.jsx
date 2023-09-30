import React from "react";
import "../styles/sign-form.css";
import Logo from "./Logo";

const SignForm = ({ children, title, subheading }) => {
	return (
		<div className="sign-form">
			<Logo />
			<h1 className="title">{title}</h1>
			<h2 className="subheading">{subheading}</h2>
			{children}
		</div>
	);
};

export default SignForm;
