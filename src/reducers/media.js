import { ERROR_SEARCH, RECEIVED_MEDIA } from "../constants/actionTypes";

const mediaReducer = (
	media = {
		error: "",
		media: [],
	},
	action
) => {
	switch (action.type) {
		case RECEIVED_MEDIA:
			return {
				error: "",
				media: action.payload,
			};
		case ERROR_SEARCH:
			return {
				media: [],
				error: "NOT FOUND",
			};
		default:
			return media;
	}
};

export default mediaReducer;
