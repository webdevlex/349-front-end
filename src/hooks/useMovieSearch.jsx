import React from "react";
import axios from "axios";

const useMovieSearch = (setMovieResults) => {
	// Define headers with authorization token
	const header = {
		headers: {
			Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
		},
	};

	// Create an asynchronous function to search for movies
	return async (searchValue, currentGenre) => {
		try {
			// Send requests to search for movies on multiple pages in parallel
			const req1 = axios.get(
				`https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en&page=1`,
				header
			);
			const req2 = axios.get(
				`https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en&page=2`,
				header
			);
			const req3 = axios.get(
				`https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en&page=3`,
				header
			);
			const req4 = axios.get(
				`https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en&page=4`,
				header
			);
			const req5 = axios.get(
				`https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en&page=5`,
				header
			);

			// Wait for all requests to complete with Promise.all
			Promise.all([req1, req2, req3, req4, req5]).then((values) => {
				const results = [];
				values.forEach((res) => {
					res.data.results.forEach((result) => {
						// Check if the movie has a backdrop image and is in English
						if (result.backdrop_path && result.original_language === "en") {
							if (currentGenre) {
								// If a genre filter is applied, check if the movie's genre matches
								if (result.genre_ids.includes(currentGenre.id)) {
									results.push(result);
								}
							} else {
								results.push(result);
							}
						}
					});
				});

				// Set the movie results and limit to 20 movies
				setMovieResults(results.slice(0, 20));
			});
		} catch (e) {
			console.log(e);
		}
	};
};

export default useMovieSearch;
