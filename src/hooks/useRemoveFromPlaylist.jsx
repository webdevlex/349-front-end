import { useContext } from "react";
import axios from "axios";
import { BackendUrlContext } from "../context/BackendUrlContext";

const useRemoveFromPlaylist = () => {
	const backendUrl = useContext(BackendUrlContext);

	const removeFromPlaylist = async (movie_id, user_id) => {
		const body = { movie_id, user_id };
		const options = {
			headers: {
				Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
			},
		};

		try {
			const res = await axios.patch(
				`${backendUrl}/api/users/remove-movie-from-playlist`,
				body,
				options
			);
			return res.data;
		} catch (err) {
			console.error(err);
		}
	};

	return removeFromPlaylist;
};

export default useRemoveFromPlaylist;
