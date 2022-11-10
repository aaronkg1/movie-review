import React, { useCallback, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import { fetchMovie } from "../../api";
import { getPayLoad } from "../../utils/auth";
import DisplayReviews from "../DisplayReviews";
import ReviewForm from "../ReviewForm";
import Spinner from "../utilities/Spinner";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const SingleMovie = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const imgRef = useRef();
	const [hasError, setHasError] = useState({
		status: false,
		message: "",
	});
	const [movie, setMovie] = useState({});
	const [reviewPosted, setReviewPosted] = useState(false);
	const fetchMovieData = useCallback(async () => {
		const { data } = await fetchMovie(id);
		setMovie(data);
		if (data.reviews.some((review) => review.owner._id === getPayLoad().sub)) {
			setReviewPosted(true);
		} else setReviewPosted(false);
	}, [id]);
	const imageToLoad = movie.image ? (
		<img
			src={movie.image.url}
			alt={movie.title}
			className="img-fluid"
			id={"single-image"}
			ref={imgRef}
		/>
	) : null;

	useEffect(() => {
		try {
			const fetchData = async () => {
				const { data } = await fetchMovie(id);
				if (
					data.reviews.find((review) => review.owner._id === getPayLoad().sub)
				) {
					setReviewPosted(true);
				}

				setMovie(data);
			};
			fetchData();
		} catch (error) {
			setHasError({ status: true, message: error.message });
		}
	}, [id, dispatch]);

	useEffect(() => {
		try {
			const fetchData = async () => {
				await fetchMovieData();
			};
			if (reviewPosted) {
				fetchData();
			}
		} catch (error) {
			setHasError({ status: true, message: error.message });
		}
	}, [reviewPosted, id, fetchMovieData]);

	return (
		<Container className="mt-4">
			{movie.title ? (
				<div className="movie-show">
					<Row className="movie-show-header">
						<Col md="10">
							<h2>{movie.title}</h2>
						</Col>
						<Col md="2" className="text-nowrap">
							<span className="star-average">★</span>{" "}
							<span className="average-num">{movie.avgRating}</span>
						</Col>
					</Row>
					<hr />
					<Row>
						<Col md="4">{imageToLoad && imageToLoad}</Col>
						<Col md="8">
							<Row>
								<Col md="6">
									<h3>Year</h3>
									<p>{movie.year}</p>
								</Col>
								<Col md="6" className="media-genres">
									<h3>Genre</h3>
									{movie.genre.map((genre, index) => {
										if (index === movie.genre.length - 1) {
											return (
												<span key={genre._id}>
													<Link to={`../movies/genre/${genre._id}`}>
														{genre.title}
													</Link>
												</span>
											);
										} else
											return (
												<span key={genre._id}>
													<Link to={`../movies/genre/${genre._id}`}>
														{genre.title}
													</Link>
													,{" "}
												</span>
											);
									})}
								</Col>
								<Col md="6">
									<h3>Director</h3>
									<p>{movie.director}</p>
								</Col>
								<Col md="6">
									<h3>Cast</h3>
									<p>
										{movie.cast.map((actor, index) => {
											if (index === movie.cast.length - 1) {
												return <span key={actor}> {actor}.</span>;
											}
											return <span key={actor}> {actor},</span>;
										})}
									</p>
								</Col>
								<Col md="12">
									<h3>Description</h3>
									<p>{movie.description}</p>
								</Col>
							</Row>
						</Col>
						{!reviewPosted ? (
							<Col md="12">
								<ReviewForm
									fetchNewData={fetchMovieData}
									mediaType={movie.type}
								/>
							</Col>
						) : null}
						<Col md="12" className="mb-4">
							<DisplayReviews
								reviews={movie.reviews}
								fetchNewData={fetchMovieData}
								mediaType={movie.type}
							/>
						</Col>
					</Row>
				</div>
			) : hasError.status ? (
				<h2>{hasError.message}</h2>
			) : (
				<Spinner />
			)}
		</Container>
	);
};

export default SingleMovie;
