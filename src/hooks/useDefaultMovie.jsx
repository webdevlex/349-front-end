import React from "react";
import axios from "axios";

const useDefaultMovie = (setMovieResults, currentGenre) => {
	// Define headers with authorization token
	const header = {
		headers: {
			Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
		},
	};

	// Define a function to fetch default movies
	return async () => {
		try {
			// Create an array of Axios requests to fetch popular movies from multiple pages
			const requests = Array.from({ length: 5 }, (_, page) =>
				axios.get(
					`https://api.themoviedb.org/3/movie/popular?language=en&page=${
						page + 1
					}`,
					header
				)
			);

			// Use Promise.all to send all requests concurrently and wait for all to complete
			Promise.all(requests).then((values) => {
				const results = [];

				// Iterate through the responses and extract movie results
				values.forEach((res) => {
					res.data.results.forEach((result) => {
						if (result.backdrop_path && result.original_language === "en") {
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

				// Set the movie results in the state
				setMovieResults(results);
			});
		} catch (e) {
			console.log(e);
		}
	};
};

export default useDefaultMovie;
