import React from "react";
import axios from "axios";

const useDefaultMovie = (setMovieResults, currentGenre) => {
	const header = {
		headers: {
			Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmU5YjYxMTdiYzdlZDE2OTA3ZjA3ZWZhNmMxNjIzNiIsInN1YiI6IjY1MTUxNTVkYTEwNzRiMDBlMzczYTllYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dVSB7EnqM57Klx8SvD0XoQ4EZm_AhV96PKOW5j16LFI`,
		},
	};

	return async () => {
		try {
			const req1 = await axios.get(
				`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
				header
			);
			const req2 = axios.get(
				`https://api.themoviedb.org/3/movie/popular?language=en-US&page=2`,
				header
			);
			const req3 = axios.get(
				`https://api.themoviedb.org/3/movie/popular?language=en-US&page=3`,
				header
			);
			const req4 = axios.get(
				`https://api.themoviedb.org/3/movie/popular?language=en-US&page=4`,
				header
			);
			const req5 = axios.get(
				`https://api.themoviedb.org/3/movie/popular?language=en-US&page=5`,
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
				setMovieResults(results);
			});

			// const res = await axios.get(
			// 	`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
			// 	header
			// );
			// setDefaultMovies(res.data.results);
			// setMovieResults(res.data.results);
		} catch (e) {
			console.log(e);
		}
	};
};

export default useDefaultMovie;
