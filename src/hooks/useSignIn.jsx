import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import axios from "axios";

// Custom hook for sign-in logic
const useSignIn = (backendUrl) => {
	const [auth, setAuth] = useContext(AuthContext);
	const [user, setUser] = useContext(UserContext);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const signIn = async (email, password, navigate) => {
		try {
			setLoading(true); // Set loading state while waiting for the response
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
				`${backendUrl}/api/users/signin`,
				body,
				options
			);

			if (res.status === 200) {
				localStorage.setItem("auth", JSON.stringify(true));
				localStorage.setItem("user", JSON.stringify(res.data));
				setUser(res.data);
				setAuth(true);
				navigate("/search");
			}
		} catch (e) {
			setError(e.response.data.error);
			console.log(e.response.data.error);
		} finally {
			setLoading(false); // Reset loading state after the request is complete
		}
	};

	return { auth, user, error, loading, signIn };
};

export default useSignIn;
