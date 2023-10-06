import React, { useState, useEffect, useContext } from "react";
import "../styles/signin.css";
import Logo from "./Logo";
import SignForm from "./SignForm";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";

import axios from "axios";

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

	const validateEmail = (email) => {
		const regex =
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regex.test(email);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setError("");

		if (!email || !password) {
			setError("Required fields.");
		} else if (!validateEmail(email)) {
			setError("Invalid email.");
		} else if (email && password) {
			try {
				setLoading(true);
				const body = {
					email,
					password,
				};
				const options = {
					headers: {
						"content-type": "application/json",
					},
				};
				const res = await axios.post(
					"http://localhost:5000/api/users/signin",
					body,
					options
				);

				if (res.status === 200) {
					localStorage.setItem("auth", JSON.stringify(true));
					localStorage.setItem("user", JSON.stringify(res.data));
					setAuth(true);
					navigate("/search");
				}
			} catch (e) {
				setError(e.response.data.error);
				console.log(e.response.data.error);
			}
			setLoading(false);
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
