import { useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { BackendUrlContext } from "../context/BackendUrlContext";

const useAddToPlaylist = () => {
	// Retrieve the user context and backend URL from the respective contexts
	const [user, setUser] = useContext(UserContext);
	const backendUrl = useContext(BackendUrlContext);

	// Function to add a movie to the user's playlist
	const addToPlaylist = async (movie, movieMap, heartLoading) => {
		// Retrieve the user from local storage
		const user = JSON.parse(localStorage.getItem("user"));

		// Combine movie and movieMap data into movieDetails
		const movieDetails = { ...movie, ...movieMap };

		// Prepare the request body with movieDetails and user_id
		const body = { movie: movieDetails, user_id: user.user_id };

		// Define request headers with authorization token
		const options = {
			headers: {
				Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
			},
		};

		try {
			// Send a POST request to add the movie to the user's playlist
			const updatedUser = await axios.post(
				`${backendUrl}/api/users/add-movie-to-playlist`,
				body,
				options
			);
			heartLoading.current = false;

			// Update the user context with the updated user data
			setUser(updatedUser.data);
		} catch (err) {
			console.log(err);
			heartLoading.current = false;
		}
	};

	return addToPlaylist;
};

export default useAddToPlaylist;
