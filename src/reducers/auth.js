import { ERROR_AUTH, LOGIN, LOGOUT } from "../constants/actionTypes";

const authReducer = (
	user = {
		status: false,
		data: {},
	},
	action
) => {
	switch (action.type) {
		case LOGIN:
			return {
				status: true,
				data: action.payload,
			};
		case LOGOUT:
			return {
				status: false,
				data: {},
			};
		case ERROR_AUTH:
			return {
				status: false,
				data: {},
			};
		default:
			return user;
	}
};

export default authReducer;
