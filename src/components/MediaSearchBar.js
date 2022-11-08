import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const MediaSearchBar = ({ variant }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	const handleSearch = (e) => {
		if (!searchTerm.length) return;
		e.preventDefault();
		navigate(`/search/${searchTerm}`);
		setSearchTerm("");
	};

	const handleEnter = (e) => {
		if (e.key === "Enter" && e.target.value.length > 0) {
			e.preventDefault();
			navigate(`/search/${e.target.value}`);
			setSearchTerm("");
		}
	};

	return (
		<Container className="search-bar-container p-0">
			<Form>
				<Form.Group className="input-group search-bar">
					<Form.Control
						type="text"
						placeholder="Find Movies, Shows or Actors"
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
						}}
						onKeyDown={handleEnter}
						className={`${variant}`}
					/>
					<div className="input-group-append">
						<span
							onClick={handleSearch}
							className="input-group-text btn btn-warning"
						>
							Search
						</span>
					</div>
				</Form.Group>
			</Form>
		</Container>
	);
};

export default MediaSearchBar;
