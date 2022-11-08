import {
	CREATED_SHOW,
	ERROR_SHOWS,
	RECEIVED_SHOWS,
	REQUESTING_SHOWS,
	SHOW_COUNT,
} from "../constants/actionTypes";

const tvShowsReducer = (
	shows = {
		shows: [],
		status: "",
		error: false,
		count: 0,
	},
	action
) => {
	switch (action.type) {
		case REQUESTING_SHOWS:
			return {
				shows: [],
				status: "FETCHING",
				error: false,
				count: shows.count,
			};
		case RECEIVED_SHOWS:
			return {
				shows: action.payload,
				status: "RECEIVED",
				error: false,
				count: shows.count,
			};
		case CREATED_SHOW:
			return {
				shows: [...shows.shows, action.payload],
				status: "CREATED",
				error: false,
				count: shows.count,
			};
		case SHOW_COUNT:
			return {
				...shows,
				count: action.payload,
			};
		case ERROR_SHOWS:
			return {
				shows: [],
				status: "COULD NOT FETCH MOVIES",
				error: true,
				count: shows.count,
			};
		default:
			return shows;
	}
};

export default tvShowsReducer;
