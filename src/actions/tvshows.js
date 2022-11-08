import * as api from "../api/index.js";
import {
	CREATED_SHOW,
	ERROR_SHOWS,
	RECEIVED_SHOWS,
	REQUESTING_SHOWS,
	SHOW_COUNT,
} from "../constants/actionTypes.js";

export const getShows = () => async (dispatch) => {
	try {
		dispatch({
			type: REQUESTING_SHOWS,
		});
		const { data } = await api.fetchShows();
		dispatch({
			type: RECEIVED_SHOWS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ERROR_SHOWS,
		});
	}
};

export const getShowsByPageNumber = (pageNumber) => async (dispatch) => {
	try {
		dispatch({
			type: REQUESTING_SHOWS,
		});
		const { data } = await api.fetchShowsByPage(pageNumber);
		dispatch({
			type: RECEIVED_SHOWS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ERROR_SHOWS,
		});
	}
};

export const getShowCount = () => async (dispatch) => {
	try {
		const { data } = await api.fetchShowCount();
		dispatch({
			type: SHOW_COUNT,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ERROR_SHOWS,
		});
	}
};

export const postTVShow = (showInfo) => async (dispatch) => {
	try {
		const show = await api.postShow(showInfo);
		dispatch({
			type: CREATED_SHOW,
			payload: show,
		});
	} catch (error) {
		console.log(error.message);
	}
};
