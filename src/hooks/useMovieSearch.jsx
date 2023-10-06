import React from "react";
import axios from "axios";

const useMovieSearch = (setMovieResults) => {
	const header = {
		headers: {
			Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
		},
	};

	return async (searchValue, currentGenre) => {
		try {
			const req1 = await axios.get(
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
			Promise.all([req1, req2, req3, req4, req5]).then((values) => {
				const results = [];
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
				setMovieResults(results.slice(0, 20));
			});
		} catch (e) {
			console.log(e);
		}
	};
};

export default useMovieSearch;
