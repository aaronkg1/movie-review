import { compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

export default configureStore(
	{ reducer: rootReducer },
	compose(applyMiddleware(thunk))
);
