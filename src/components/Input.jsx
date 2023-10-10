import React from "react";
import "../styles/input.css";

// Input component represents an input field with optional error styling.
const Input = ({ type, placeHolder, value, callback, error }) => {
	return (
		<input
			type={type} // Input type (e.g., text, password, etc.)
			className={`sign-input ${error ? "error" : ""}`} // Apply error styling if 'error' is true
			onChange={callback} // Callback function for handling input changes
			value={value} // Current value of the input
			placeholder={placeHolder} // Placeholder text for the input
		/>
	);
};

export default Input;
