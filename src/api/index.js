import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/auth";

// Search

const baseUrl = "https://scene-it-project.herokuapp.com";

export const searchMedia = (searchPhrase) =>
	axios.get(`/search/${searchPhrase}`);

// Movies
export const fetchMovieCount = () => axios.get(`${baseUrl}/movies/count`);
export const fetchMovies = () => axios.get(`${baseUrl}/movies`);
export const fetchMoviesByPage = (page) =>
	axios.get(`${baseUrl}/movies/page/${page}`);
export const fetchMovie = (id) => axios.get(`${baseUrl}/movies/${id}`);
export const postMovie = (movieInfo) =>
	axios.post(`${baseUrl}/movies`, movieInfo, {
		headers: {
			Authorization: `Bearer ${getTokenFromLocalStorage()}`,
		},
	});

// Shows
export const fetchShowCount = () => axios.get(`${baseUrl}/tvshows/count`);
export const fetchShows = () => axios.get(`${baseUrl}/tvshows`);
export const fetchShowsByPage = (page) =>
	axios.get(`${baseUrl}/tvshows/page/${page}`);
export const fetchShow = (id) => axios.get(`${baseUrl}/tvshows/${id}`);
export const postShow = (showInfo) =>
	axios.post(`${baseUrl}/tvshows`, showInfo, {
		headers: {
			Authorization: `Bearer ${getTokenFromLocalStorage()}`,
		},
	});

// Auth

export const registerUser = (userData) =>
	axios.post(`${baseUrl}/register`, userData);
export const loginUser = (userData) => axios.post(`${baseUrl}/login`, userData);

// User

export const findUserData = (id) =>
	axios.get(`${baseUrl}/profile/${id}`, {
		headers: {
			Authorization: `Bearer ${getTokenFromLocalStorage()}`,
		},
	});

// Genre

export const getGenres = () => axios.get(`${baseUrl}/genres`);

export const getMoviesByGenre = (genreId) =>
	axios.get(`${baseUrl}/movies/genre/${genreId}`);

export const getTvShowsByGenre = (genreId) =>
	axios.get(`${baseUrl}/tvshows/genre/${genreId}`);

// Reviews

export const postMovieReview = (review, id) =>
	axios.post(`${baseUrl}/movies/${id}/reviews`, review, {
		headers: {
			Authorization: `Bearer ${getTokenFromLocalStorage()}`,
		},
	});
export const editMovieReview = (data, reviewId, id) =>
	axios.put(`${baseUrl}/${id}/reviews/${reviewId}`, data, {
		headers: {
			Authorization: `Bearer ${getTokenFromLocalStorage()}`,
		},
	});
