import * as api from "../api/index.js";
import {
	CREATED_MOVIE,
	ERROR_MOVIES,
	MOVIE_COUNT,
	RECEIVED_MOVIES,
	REQUESTING_MOVIES,
} from "../constants/actionTypes.js";

export const getMovies = () => async (dispatch) => {
	try {
		dispatch({
			type: REQUESTING_MOVIES,
		});
		const { data } = await api.fetchMovies();
		dispatch({
			type: RECEIVED_MOVIES,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ERROR_MOVIES,
		});
	}
};
export const getMoviesByPageNumber = (pageNumber) => async (dispatch) => {
	try {
		dispatch({
			type: REQUESTING_MOVIES,
		});
		const { data } = await api.fetchMoviesByPage(pageNumber);
		dispatch({
			type: RECEIVED_MOVIES,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ERROR_MOVIES,
		});
	}
};
export const getMovieCount = () => async (dispatch) => {
	try {
		const { data } = await api.fetchMovieCount();
		dispatch({
			type: MOVIE_COUNT,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ERROR_MOVIES,
		});
	}
};

export const postMovie = (movieInfo) => async (dispatch) => {
	try {
		const movie = await api.postMovie(movieInfo);
		dispatch({
			type: CREATED_MOVIE,
			payload: movie,
		});
	} catch (error) {
		console.log(error.message);
	}
};
