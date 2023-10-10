import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { BackendUrlContext } from "../context/BackendUrlContext";

const useSignUp = () => {
	const [auth, setAuth] = useContext(AuthContext);
	const [user, setUser] = useContext(UserContext);
	const backendUrl = useContext(BackendUrlContext);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const signUp = async (email, password, confirmPassword, navigate) => {
		setError("");
		setLoading(true);

		try {
			const body = {
				email,
				password,
				confirmPassword,
			};
			const options = {
				headers: {
					"content-type": "application/json",
				},
			};
			const res = await axios.post(
				`${backendUrl}/api/users/signup`,
				body,
				options
			);

			if (res.status === 200) {
				// localStorage.setItem("auth", JSON.stringify(true));
				// localStorage.setItem("user", JSON.stringify(res.data));
				// setUser(res.data);
				// setAuth(true);
				navigate("/signin");
			}
		} catch (e) {
			setError(e.response.data.error);
			console.error(e.response.data.error);
		}

		setLoading(false);
	};

	return { signUp, error, loading };
};

export default useSignUp;
