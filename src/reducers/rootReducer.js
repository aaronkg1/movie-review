import { combineReducers } from "redux";
import authReducer from "./auth.js";
import moviesReducer from "./movies.js";
import showsReducer from "./tvshows.js";
import mediaReducer from "./media.js";

export default combineReducers({
	movies: moviesReducer,
	shows: showsReducer,
	auth: authReducer,
	media: mediaReducer,
});
