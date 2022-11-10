import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { postMovieReview, postShowReview } from "../api";
import { Link } from "react-router-dom";
import { checkForToken } from "../actions/auth";

const ReviewForm = ({ fetchNewData, mediaType }) => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const authStatus = useSelector((state) => state.auth);
	const [review, setReview] = useState({
		text: "",
		rating: false,
	});
	const [hasError, setHasError] = useState({
		error: false,
		message: "",
	});
	const [rating, setRating] = useState([false, false, false, false, false]);

	useEffect(() => {
		dispatch(checkForToken());
	}, [dispatch]);

	const handleChange = (e) => {
		setReview({ ...review, [e.target.name]: e.target.value });
	};

	const handleMouseOver = (index) => {
		const newRatingArr = [
			...Array(index + 1).fill(true),
			...Array(5 - (index + 1)).fill(false),
		];
		setRating(newRatingArr);
	};

	const handleMouseExit = () => {
		if (!review.rating) {
			setRating(Array(5).fill(false));
		} else {
			const newRatingArr = [
				...Array(review.rating).fill(true),
				...Array(5 - review.rating).fill(false),
			];
			setRating(newRatingArr);
		}
	};
	const handleClick = (index) => {
		setRating([
			...Array(index + 1).fill(true),
			...Array(5 - (index + 1)).fill(false),
		]);
		setReview({ ...review, rating: index + 1 });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!review.text.length || !review.rating) {
			return setHasError({
				error: true,
				message: "Review must have rating and text",
			});
		}
		if (mediaType === "movie") {
			const reviewSent = await postMovieReview(review, id);
			if (reviewSent.status === 202) fetchNewData();
		} else {
			const reviewSent = await postShowReview(review, id);
			if (reviewSent.status === 202) fetchNewData();
		}
	};

	return (
		<>
			{authStatus.status ? (
				<Container className="mt-4 review-form-container">
					<Form>
						<h2>Add Review</h2>
						<Form.Group className="mb-2">
							<Form.Label htmlFor="rating">Rating</Form.Label>
							<div onMouseLeave={handleMouseExit}>
								{rating.map((star, index) => {
									return star ? (
										<span
											className="rating-star filled"
											key={`rating-${index}`}
											onMouseEnter={() => {
												handleMouseOver(index);
											}}
											onClick={() => {
												handleClick(index);
											}}
										>
											★
										</span>
									) : (
										<span
											className="rating-star"
											key={`rating-${index}`}
											onMouseEnter={() => {
												handleMouseOver(index);
											}}
											onClick={() => {
												handleClick(index);
											}}
										>
											☆
										</span>
									);
								})}
							</div>
						</Form.Group>
						<Form.Group className="mb-2">
							<Form.Label htmlFor="text">Review</Form.Label>
							<Form.Control
								as="textarea"
								name="text"
								placeholder="What did you think?"
								value={review.id}
								onChange={handleChange}
								maxLength={300}
							/>
						</Form.Group>
						<FormGroup className="mb-2">
							<Button variant="warning" type="submit" onClick={handleSubmit}>
								Submit
							</Button>
						</FormGroup>
						{hasError.status && <span>{hasError.message}</span>}
					</Form>
				</Container>
			) : (
				<Link to="/login">Login to post review</Link>
			)}
		</>
	);
};

export default ReviewForm;
