import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import store from "./store.js";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";

const root = createRoot(document.getElementById("root"));

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
