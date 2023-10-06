import axios from "axios";

export default async function removeFromPlaylist(movie_id, user_id) {
	const body = { movie_id, user_id };
	const options = {
		headers: {
			Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
		},
	};

	try {
		const res = await axios.patch(
			"http://localhost:5000/api/users/remove-movie-from-playlist",
			body,
			options
		);
		return res.data;
	} catch (err) {
		console.log(err);
	}
}
