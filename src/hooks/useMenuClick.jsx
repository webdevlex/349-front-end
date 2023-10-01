import React from "react";
import axios from "axios";

const useMenuClick = (setMovieResults) => {
	const header = {
		headers: {
			Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
		},
	};

	return async (currentSection) => {
		let url;
		switch (currentSection) {
			case "Trending":
				url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
				break;
			case "Now Playing":
				url =
					"https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
				break;
			case "Search":
				url =
					"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc";
				break;
			case "Upcoming":
				url =
					"https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
				break;
			default:
		}

		try {
			const res = await axios.get(url, header);
			setMovieResults(res.data.results);
		} catch (e) {
			console.log(e);
		}
	};
};

export default useMenuClick;
