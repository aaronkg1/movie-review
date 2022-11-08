import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom";
import { findUserData } from "../../api";
import ProfileReviews from "../ProfileReviews";
import Spinner from "../utilities/Spinner";

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
    });
    const [reviews, setReviews] = useState([]);
    const [hasError, setHasError] = useState({
        status: false,
        message: ''
    })
    useEffect(() => {
        const getUserData = async () => {
            try {
                const { data } = await findUserData(id);
                setUser(data);

            } catch (error) {
                setHasError({
                    status: true,
                    message: error.message,
                })
            }
        }
        getUserData();
    }, [id])
    useEffect(() => {
        if (!user._id) return
        const userReviews = [];
        const moviesReviewed = user.reviews;
        moviesReviewed.forEach(movie => {
            const userReview = movie.reviews.find(review => {
                return review.owner === id
            });
            userReviews.push({...userReview, media: movie});
        });
        setReviews(userReviews);
    }, [user, id]);
    return (<Container className="mt-4">
        <h2>{user.username}</h2>
        {!hasError.status ? <ProfileReviews reviews={reviews}/> : hasError.status ? <p>{hasError.message}</p> : <Spinner />}
    </Container>)
}

export default Profile;