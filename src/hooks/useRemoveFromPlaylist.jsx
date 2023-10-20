import { useContext } from "react";
import axios from "axios";
import { BackendUrlContext } from "../context/BackendUrlContext";

const useRemoveFromPlaylist = () => {
	// Get the backend URL from the context
	const backendUrl = useContext(BackendUrlContext);

	// Create a function to remove a movie from the playlist
	const removeFromPlaylist = async (movie_id, user_id, heartLoading) => {
		// Prepare the request body and options
		const body = { movie_id, user_id };
		const options = {
			headers: {
				Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
			},
		};

		try {
			// Send a PATCH request to remove the movie from the playlist
			const res = await axios.patch(
				`${backendUrl}/api/users/remove-movie-from-playlist`,
				body,
				options
			);
			heartLoading.current = false;
			// Update the heartLoading state and return the response data
			return res.data;
		} catch (err) {
			// Handle errors, update the heartLoading state, and log the error
			console.error(err);
			heartLoading.current = false;
		}
	};

	return removeFromPlaylist;
};

export default useRemoveFromPlaylist;
