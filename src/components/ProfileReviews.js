import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import format from "date-fns/format";
import { getPayLoad } from "../utils/auth";
import Button from "react-bootstrap/esm/Button";
import EditReviewForm from "./EditReviewForm";
import { Link } from "react-router-dom";

const ProfileReviews = ({ reviews }) => {
	const [editReviewClicked, setEditReviewClicked] = useState({});
	const [sortedReviews, setSortedReviews] = useState([]);
	const generateStars = (rating) => {
		let starString = "";
		for (let i = 0; i < 5; i++) {
			if (i < rating) {
				starString += "★";
			} else starString += "☆";
		}
		return starString;
	};
	useEffect(() => {
		setSortedReviews(
			reviews.sort((a, b) => {
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			})
		);
	}, [reviews]);
	return (
		<Container className="mt-4 reviews">
			{sortedReviews.length ? (
				<Row>
					{editReviewClicked.owner ? (
						<Col md="12">
							<EditReviewForm
								reviewToEdit={editReviewClicked}
								hideForm={setEditReviewClicked}
							/>
						</Col>
					) : null}
					{sortedReviews.map((review) => {
						return (
							<Col md="12" key={review._id} className="review mt-2">
								<Row>
									<Col lg="10" md="10" className="review-header">
										<span>
											<Link
												to={
													review.media.type === "movie"
														? `/movies/${review.media._id}`
														: `/tvshows/${review.media._id}`
												}
											>
												{review.media.title}
											</Link>
										</span>
									</Col>
									<Col lg="2" md="2" className="review-header">
										<span className="star-average">
											{generateStars(review.rating)}
										</span>
									</Col>
									<Col lg="12" md="12" className="mb-2 review-info">
										<span>
											{format(new Date(review.updatedAt), "dd/MM/yyyy")}
										</span>
										{review.owner._id === getPayLoad().sub ? (
											<Button
												className="edit-review-btn"
												onClick={() => {
													setEditReviewClicked(review);
												}}
											>
												Edit
											</Button>
										) : null}
									</Col>
									<hr />
									<Col md="12">
										<p>{review.text}</p>
									</Col>
								</Row>
							</Col>
						);
					})}
				</Row>
			) : (
				<Row>
					<Col md="12">
						<p>No reviews yet</p>
					</Col>
				</Row>
			)}
		</Container>
	);
};

export default ProfileReviews;
