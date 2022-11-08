import { Buffer } from "buffer";

export const getTokenFromLocalStorage = () => {
	return window.localStorage.getItem("seenit-token-movies-app");
};

export const getPayLoad = () => {
	const token = getTokenFromLocalStorage();
	if (!token) return;
	const splitToken = token.split(".");
	if (splitToken.length !== 3) return;
	return JSON.parse(Buffer.from(splitToken[1], "base64"));
};

export const userIsAuthenticated = () => {
	const payload = getPayLoad();
	if (!payload) return;
	const currentTime = Math.round(Date.now() / 1000);
	const { exp } = payload;
	return currentTime < exp;
};
