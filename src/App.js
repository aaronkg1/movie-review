import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register";
import Home from "./components/Home";
import MovieIndex from "./components/movies/MovieIndex";
import SingleMovie from "./components/movies/SingleMovie";
import Profile from "./components/user/Profile";
import ShowIndex from "./components/shows/ShowIndex";
import SingleShow from "./components/shows/SingleShow";
import SiteNavBar from "./components/SiteNavBar";
import CurrentUser from "./components/user/CurrentUser.js";
import MoviesByGenre from "./components/movies/MoviesByGenre.js";
import TvShowsByGenre from "./components/shows/TvShowsByGenre.js";
import MediaForm from "./components/MediaForm.js";
import SearchIndex from "./components/SearchIndex.js";
import { useSelector } from "react-redux";

const App = () => {
	const backgroundColor = useSelector((state) => state.style);
	return (
		<div
			className="site-wrapper bg-gradient-hot"
			style={{ backgroundColor: backgroundColor?.backgroundColor }}
		>
			<BrowserRouter>
				<SiteNavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/movies" element={<MovieIndex />} />
					<Route path="/movies/page/:pageNumber" element={<MovieIndex />} />
					<Route path="/movies/:id" element={<SingleMovie />} />
					<Route path="/movies/genre/:genreId" element={<MoviesByGenre />} />
					<Route path="/tvshows" element={<ShowIndex />} />
					<Route path="/tvshows/page/:pageNumber" element={<ShowIndex />} />
					<Route path="/tvshows/:id" element={<SingleShow />} />
					<Route path="/tvshows/genre/:genreId" element={<TvShowsByGenre />} />
					<Route path="/profile" element={<CurrentUser />} />
					<Route path="/profile/:id" element={<Profile />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/addnew" element={<MediaForm />} />
					<Route path="/search/:searchTerm" element={<SearchIndex />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
