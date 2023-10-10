import React, { useState, useEffect, useContext } from "react";
import "../styles/signin.css";
import Logo from "./Logo";
import SignForm from "./SignForm";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";

// Import the custom hook
import useSignUp from "../hooks/useSignUp";

const SignIn = () => {
	const navigate = useNavigate();
	const [auth, setAuth] = useContext(AuthContext);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState("");

	useEffect(() => {
		if (auth) {
			navigate("/search");
		}
	}, [auth, navigate]);

	const [email, setEmail] = useState("");
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const [password, setPassword] = useState("");
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const [confirmPassword, setConfirmPassword] = useState("");
	const handleConfirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
	};

	const validateEmail = (email) => {
		const regex =
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regex.test(email);
	};

	// Use the custom hook
	const { signUp, error: signUpError, loading: signUpLoading } = useSignUp();

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (!email || !password || !confirmPassword) {
			setError("Required fields.");
		} else if (!validateEmail(email)) {
			setError("Invalid email.");
		} else if (password !== confirmPassword) {
			setError("Passwords do not match.");
		} else {
			signUp(email, password, confirmPassword, navigate); // Use signUp from the custom hook
		}
	};

	return (
		<div className="signin">
			<div className="sign-nav">
				<div className="sign-logo">
					<Logo />
				</div>
				<Link to="/signup" className="link">
					Sign Up
				</Link>
			</div>
			<div className="sign-form-wrapper">
				<SignForm
					title={"Sign Up"}
					subheading={"Sign up to create movie playlists."}>
					<form className="form" onSubmit={(e) => handleSubmit(e)}>
						<div className="sign-inputs">
							<Input
								type="text"
								placeHolder={"Email"}
								value={email}
								callback={handleEmailChange}
								error={error}
							/>
							<Input
								type="password"
								placeHolder={"Password"}
								value={password}
								callback={handlePasswordChange}
								error={error}
							/>
							<Input
								type="password"
								placeHolder={"Confirm Password"}
								value={confirmPassword}
								callback={handleConfirmPasswordChange}
								error={error}
							/>
						</div>
						<p className="error-message">{error || signUpError}</p>
						<button className="sign-button" type="submit">
							{loading || signUpLoading ? <Spinner /> : "Sign Up"}
						</button>
					</form>
					<div className="sign-additional">
						<span>Already have an account? </span>
						<Link to="/signin" className="sign-link">
							Sign In.
						</Link>
					</div>
				</SignForm>
			</div>
		</div>
	);
};

export default SignIn;
