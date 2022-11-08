import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTvShowsByGenre } from "../../api";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import MediaCard from "../MediaCard";
import Spinner from "../utilities/Spinner";

const TvShowsByGenre = () => {
	const [shows, setShows] = useState([]);
	const [genre, setGenre] = useState({});
	const [hasError, setHasError] = useState({
		status: false,
		message: "",
	});
	const { genreId } = useParams();

	useEffect(() => {
		const fetchShowsByGenre = async () => {
			try {
				const { data } = await getTvShowsByGenre(genreId);
				const { shows, genre } = data;
				setShows(shows);
				setGenre(genre);
			} catch (error) {
				setHasError({
					status: true,
					message: error.response.data,
				});
			}
		};
		fetchShowsByGenre();
	}, [genreId]);
	return (
		<Container className="mt-4">
			{genre.title && <h1>{genre.title} TV Shows</h1>}
			<Link to="../tvshows" className="nav-link">
				View All TV Shows
			</Link>
			<Row className="mt-4">
				{shows.length ? (
					<>
						{shows.map((show) => {
							const { _id } = show;
							return (
								<Col md="6" lg="4" className="movie mb-4" key={_id}>
									<MediaCard media={show} />
								</Col>
							);
						})}
					</>
				) : hasError.status ? (
					<h2 className="error">{hasError.message}</h2>
				) : (
					<Spinner />
				)}
			</Row>
		</Container>
	);
};
export default TvShowsByGenre;
