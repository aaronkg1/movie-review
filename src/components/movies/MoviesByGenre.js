import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesByGenre } from "../../api";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import MediaCard from "../MediaCard";
import Spinner from "../utilities/Spinner";

const MoviesByGenre = () => {
	const [movies, setMovies] = useState([]);
	const [genre, setGenre] = useState({});
	const [hasError, setHasError] = useState({
		status: false,
		message: "",
	});
	const { genreId } = useParams();

	useEffect(() => {
		const fetchMoviesByGenre = async () => {
			try {
				const { data } = await getMoviesByGenre(genreId);
				const { movies, genre } = data;
				setMovies(movies);
				setGenre(genre);
			} catch (error) {
				setHasError({
					status: true,
					message: error.response.data,
				});
			}
		};
		fetchMoviesByGenre();
	}, [genreId]);
	return (
		<Container className="mt-4">
			{genre.title && <h1>{genre.title} Movies</h1>}
			<Link to="../movies" className="nav-link">
				View All Movies
			</Link>
			<Row className="mt-4">
				{movies.length ? (
					<>
						{movies.map((movie) => {
							const { _id } = movie;
							return (
								<Col md="6" lg="4" className="movie mb-4" key={_id}>
									<MediaCard media={movie} />
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
export default MoviesByGenre;
