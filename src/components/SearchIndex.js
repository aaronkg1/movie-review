import React, { useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMediaFromSearch } from "../actions/allMedia";
import MediaCard from "./MediaCard";
import Spinner from "./utilities/Spinner";

const SearchIndex = () => {
	const media = useSelector((state) => state.media.media);
	const error = useSelector((state) => state.media.error);
	const { searchTerm } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMediaFromSearch(searchTerm));
	}, [searchTerm, dispatch]);

	useEffect(() => {}, [media]);

	return (
		<Container className="mt-4">
			<h2>
				Search Results for <span className="search-term">"{searchTerm}"</span>
			</h2>
			{media.length !== 0 ? (
				<Row className="mt-4">
					{media.map((result) => {
						return (
							<Col md="3" className="movie mb-4" key={result._id}>
								<MediaCard media={result} />
							</Col>
						);
					})}
				</Row>
			) : error.length ? (
				<p>No results found</p>
			) : (
				<Spinner />
			)}
		</Container>
	);
};

export default SearchIndex;
