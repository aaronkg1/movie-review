import * as api from "../api/index.js";
import { ERROR_AUTH, LOGIN, LOGOUT } from "../constants/actionTypes.js";
import { getPayLoad, userIsAuthenticated } from "../utils/auth.js";

export const login = (userData) => async (dispatch) => {
	try {
		const { data } = await api.loginUser(userData);
		window.localStorage.setItem("seenit-token-movies-app", data.token);
		dispatch({
			type: LOGIN,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ERROR_AUTH,
		});
	}
};

export const logout = () => async (dispatch) => {
	window.localStorage.removeItem("seenit-token-movies-app");
	dispatch({
		type: LOGOUT,
	});
};

export const checkForToken = () => async (dispatch) => {
	if (userIsAuthenticated()) {
		const { data } = await api.findUserData(getPayLoad().sub);
		dispatch({
			type: LOGIN,
			payload: data,
		});
	}
};
