import React from "react";
import axios from "axios";

const useMovieModalInfo = (setMovieInfoMap, movieName) => {
	const header = {
		headers: {
			Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
		},
	};

	return async (movieID) => {
		try {
			const credits = await axios.get(
				`https://api.themoviedb.org/3/movie/${movieID}/credits?language=en-US`,
				header
			);
			const details = await axios.get(
				`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
				header
			);
			const contentRating = await axios.get(
				`https://api.themoviedb.org/3/movie/${movieID}/releases?language=en-US`,
				header
			);
			Promise.all([credits, details, contentRating]).then((values) => {
				let movieMap = {};

				// For caching purposes
				movieMap[movieID] = movieName;

				const directorNames = values[0].data.crew
					.filter((crewMember) => crewMember.job === "Director")
					.map((director) => director.name);

				const runtime = values[1].data.runtime;
				const budget = values[1].data.budget.toLocaleString();

				const usEntries = values[2].data.countries.filter(
					(country) => country.iso_3166_1 === "US" && country.certification
				);

				// Get the most recent content rating
				usEntries.sort((a, b) => {
					const dateA = new Date(a.release_date);
					const dateB = new Date(b.release_date);
					return dateB - dateA;
				});

				const recentContentRating = usEntries[0]?.certification;

				movieMap = {
					directors: directorNames.join(", ") || "",
					runtime: runtime || "",
					budget: budget || "",
					contentRating: recentContentRating || "",
				};

				setMovieInfoMap(movieMap);
			});
		} catch (e) {
			console.log(e);
		}
	};
};

export default useMovieModalInfo;
