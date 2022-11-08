import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import format from "date-fns/format";
import { getPayLoad } from "../utils/auth";
import Button from "react-bootstrap/esm/Button";
import EditReviewForm from "./EditReviewForm";
import { Link } from "react-router-dom";

const DisplayReviews = ({ reviews, fetchNewData }) => {
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
		<Container className="mt-2 reviews p-0">
			<h3>Reviews</h3>
			{sortedReviews.length ? (
				<Row className="mt-2 d-flex justify-content-center">
					{editReviewClicked.owner ? (
						<Col md="12">
							<EditReviewForm
								reviewToEdit={editReviewClicked}
								hideForm={setEditReviewClicked}
								fetchNewData={fetchNewData}
							/>
						</Col>
					) : null}
					{sortedReviews.map((review) => {
						return (
							<Col md="12" xs="11" key={review._id} className="review mt-2">
								<Row>
									<Col lg="12" md="12" className="review-header">
										<span className="star-average">
											{generateStars(review.rating)}
										</span>
									</Col>
									<Col lg="12" md="12" className="mb-2 review-info">
										<Link to={`../../profile/${review.owner._id}`}>
											{review.owner.username}
										</Link>
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
				<p>No reviews yet, be the first!</p>
			)}
		</Container>
	);
};

export default DisplayReviews;
