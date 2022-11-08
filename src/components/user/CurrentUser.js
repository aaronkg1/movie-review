import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { findUserData } from "../../api";
import { getPayLoad } from "../../utils/auth";
import ProfileReviews from "../ProfileReviews";
import Spinner from "../utilities/Spinner";

const CurrentUser = () => {
	const [user, setUser] = useState({});
	const [reviews, setReviews] = useState([]);
	const [hasError, setHasError] = useState({
		status: false,
		message: "",
	});
	useEffect(() => {
		const getUserData = async () => {
			const { sub } = getPayLoad();
			try {
				const { data } = await findUserData(sub);
				setUser(data);
			} catch (error) {
				setHasError({
					status: true,
					message: error.message,
				});
			}
		};
		getUserData();
	}, []);
	useEffect(() => {
		if (!user._id) return;
		const userReviews = [];
		const moviesReviewed = user.reviews;
		moviesReviewed.forEach((movie) => {
			const userReview = movie.reviews.find((review) => {
				return review.owner === user._id;
			});
			userReviews.push({ ...userReview, media: movie });
		});
		setReviews(userReviews);
	}, [user]);
	return (
		<Container className="mt-4">
			<h2>{user.username}</h2>

			{!hasError.status ? (
				<ProfileReviews reviews={reviews} />
			) : hasError.status ? (
				<p>{hasError.message}</p>
			) : (
				<Spinner />
			)}
		</Container>
	);
};

export default CurrentUser;
