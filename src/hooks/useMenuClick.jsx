import React from "react";
import axios from "axios";

const useMenuClick = (setMovieResults) => {
	// Define headers with authorization token
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
				// Fetch movies based on the current genre and section
				const requests = Array.from({ length: 5 }, (_, page) =>
					axios.get(
						`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${
							page + 1
						}&sort_by=vote_count.desc`,
						header
					)
				);

				// Use Promise.all to send all requests concurrently and wait for all to complete
				Promise.all(requests).then((values) => {
					const results = [];
					values.forEach((res) => {
						res.data.results.forEach((result) => {
							// Must have image
							if (result.backdrop_path) {
								// Must match genre that is currently clicked
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
					// Set the movie results in the state, limited to 20 items
					setMovieResults(results.slice(0, 20));
				});
			} else {
				// Fetch movies based on the current section
				const res = await axios.get(url, header);
				setMovieResults(res.data.results);
			}
		} catch (e) {
			console.log(e);
		}
	};
};

export default useMenuClick;
