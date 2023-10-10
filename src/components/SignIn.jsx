import React, { useState, useEffect, useContext } from "react";
import "../styles/signin.css";
import Logo from "./Logo";
import SignForm from "./SignForm";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { BackendUrlContext } from "../context/BackendUrlContext";
import Spinner from "../components/Spinner";
import useSignIn from "../hooks/useSignIn"; // Import the custom hook

const SignIn = () => {
	const navigate = useNavigate();
	const backendUrl = useContext(BackendUrlContext);
	const { auth, user, error, loading, signIn } = useSignIn(backendUrl); // Use the custom hook

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

	const handleSubmit = (e) => {
		e.preventDefault();

		// Call the signIn function from the custom hook
		signIn(email, password, navigate);
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
					title={"Sign In"}
					subheading={"Sign in to access your saved movies."}>
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
						</div>
						<p className="error-message">{error}</p>
						<button className="sign-button" type="submit">
							{loading ? <Spinner /> : "Sign In"}
						</button>
					</form>
					<div className="sign-additional">
						<span>Not a member? </span>
						<Link to="/signup" className="sign-link">
							Sign Up.
						</Link>
					</div>
				</SignForm>
			</div>
		</div>
	);
};

export default SignIn;
