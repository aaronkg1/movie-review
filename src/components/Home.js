import React from "react";

import MediaSearchBar from "./MediaSearchBar";

const Home = () => {
	return (
		<div className="hero text-center">
			<div className="hero-overlay">
				<h1 className="display-4 hero-header text-gradient-warm">
					🎬 Scene-it 🎥
				</h1>
				<p className="lead">Review movies and tv shows</p>
				<MediaSearchBar variant="dark" />
			</div>
		</div>
	);
};

export default Home;
