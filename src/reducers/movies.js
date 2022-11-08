import {
	CREATED_MOVIE,
	ERROR_MOVIES,
	MOVIE_COUNT,
	RECEIVED_MOVIES,
	REQUESTING_MOVIES,
} from "../constants/actionTypes";

const moviesReducer = (
	movies = {
		movies: [],
		status: "",
		error: false,
		count: 0,
	},
	action
) => {
	switch (action.type) {
		case REQUESTING_MOVIES:
			return {
				movies: [],
				status: "FETCHING",
				error: false,
				count: movies.count,
			};
		case RECEIVED_MOVIES:
			return {
				movies: action.payload,
				status: "RECEIVED",
				error: false,
				count: movies.count,
			};
		case CREATED_MOVIE:
			return {
				movies: [...movies.movies, action.payload],
				status: "CREATED",
				error: false,
				count: movies.count,
			};
		case MOVIE_COUNT:
			return {
				movies: movies.movies,
				status: "RECEIVED",
				error: false,
				count: action.payload,
			};
		case ERROR_MOVIES:
			return {
				movies: [],
				status: "COULD NOT FETCH MOVIES",
				error: true,
			};
		default:
			return movies;
	}
};
export default moviesReducer;
