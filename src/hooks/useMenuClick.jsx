import React from "react";
import axios from "axios";

const useMenuClick = (setMovieResults) => {
	const header = {
		headers: {
			Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
		},
	};

	return async (currentSection, currentGenre) => {
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
			if (currentSection === "Search" && currentGenre) {
				const req1 = await axios.get(
					"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc",
					header
				);
				const req2 = await axios.get(
					"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=vote_count.desc",
					header
				);
				const req3 = await axios.get(
					"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=3&sort_by=vote_count.desc",
					header
				);
				const req4 = await axios.get(
					"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=4&sort_by=vote_count.desc",
					header
				);
				const req5 = await axios.get(
					"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=5&sort_by=vote_count.desc",
					header
				);
				Promise.all([req1, req2, req3, req4, req5]).then((values) => {
					const results = [];
					values.forEach((res) => {
						res.data.results.forEach((result) => {
							if (result.backdrop_path) {
								if (currentGenre) {
									if (result.genre_ids.includes(currentGenre.id)) {
										results.push(result);
									}
								} else {
									results.push(result);
								}
							}
						});
					});
					setMovieResults(results.slice(0, 20));
				});
			} else {
				const res = await axios.get(url, header);
				setMovieResults(res.data.results);
			}
		} catch (e) {
			console.log(e);
		}
	};
};

export default useMenuClick;
