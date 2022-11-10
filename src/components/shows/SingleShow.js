import React, { useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchShow } from "../../api";
import { getPayLoad } from "../../utils/auth";
import DisplayReviews from "../DisplayReviews";
import ReviewForm from "../ReviewForm";
import Spinner from "../utilities/Spinner";

const SingleShow = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const [hasError, setHasError] = useState({
		status: false,
		message: "",
	});
	const [show, setShow] = useState({});
	const [reviewPosted, setReviewPosted] = useState(false);

	const fetchShowData = useCallback(async () => {
		try {
			const { data } = await fetchShow(id);
			setShow(data);
			if (
				data.reviews.some((review) => review.owner._id === getPayLoad().sub)
			) {
				setReviewPosted(true);
			} else setReviewPosted(false);
		} catch (error) {
			setHasError({ status: true, message: error.message });
		}
	}, [id]);

	useEffect(() => {
		try {
			const fetchData = async () => {
				const { data } = await fetchShow(id);
				if (
					data.reviews.find((review) => review.owner._id === getPayLoad().sub)
				) {
					setReviewPosted(true);
				}
				setShow(data);
			};
			fetchData();
		} catch (error) {
			setHasError({
				status: true,
				message: error.message,
			});
		}
	}, [id, dispatch]);

	return (
		<Container className="mt-4">
			{show.title ? (
				<div className="movie-show">
					<Row className="movie-show-header">
						<Col md="10">
							<h2>
								{show.title} - Season {show.season}
							</h2>
						</Col>
						<Col md="2" className="text-nowrap">
							<span className="star-average">★</span>{" "}
							<span className="average-num">{show.avgRating}</span>
						</Col>
					</Row>
					<hr />
					<Row>
						<Col md="4">
							<img
								src={show.image.url}
								alt={show.title}
								className="img-fluid"
							/>
						</Col>
						<Col md="8">
							<Row>
								<Col md="6">
									<h3>Year</h3>
									<p>{show.year}</p>
								</Col>
								<Col md="6" className="media-genres">
									<h3>Genre</h3>
									{show.genre.map((genre, index) => {
										if (index === show.genre.length - 1) {
											return (
												<span key={genre._id}>
													<Link to={`../tvshows/genre/${genre._id}`}>
														{genre.title}
													</Link>
												</span>
											);
										} else
											return (
												<span key={genre._id}>
													<Link to={`../tvshows/genre/${genre._id}`}>
														{genre.title}
													</Link>
													,{" "}
												</span>
											);
									})}
								</Col>
								<Col md="6">
									<h3>Director</h3>
									<p>{show.director}</p>
								</Col>
								<Col md="6">
									<h3>Cast</h3>
									<p>
										{show.cast.map((actor, index) => {
											if (index === show.cast.length - 1) {
												return <span key={actor}> {actor}.</span>;
											}
											return <span key={actor}> {actor},</span>;
										})}
									</p>
								</Col>
								<Col md="12">
									<h3>Description</h3>
									<p>{show.description}</p>
								</Col>
							</Row>
						</Col>
						{!reviewPosted ? (
							<Col md="12">
								<ReviewForm
									fetchNewData={fetchShowData}
									mediaType={show.type}
								/>
							</Col>
						) : null}
						<Col md="12" className="mb-4">
							<DisplayReviews
								reviews={show.reviews}
								fetchNewData={fetchShowData}
								mediaType={show.type}
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

export default SingleShow;
