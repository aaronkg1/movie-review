import * as api from "../api/index.js";
import { RECEIVED_MEDIA, ERROR_SEARCH } from "../constants/actionTypes.js";

export const getMediaFromSearch = (searchTerm) => async (dispatch) => {
	try {
		const { data } = await api.searchMedia(searchTerm);
		dispatch({
			type: RECEIVED_MEDIA,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ERROR_SEARCH,
		});
	}
};
