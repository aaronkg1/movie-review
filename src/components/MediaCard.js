import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const MediaCard = ({ media }) => {
	const { title, image, _id, year, avgRating, type } = media;

	const mediaLink = type === "series" ? `/tvshows/${_id}` : `/movies/${_id}`;

	return (
		<Link className="media-link" to={mediaLink}>
			<Card className="h-100">
				<Card.Header className="rating-header">
					<div sm="12" className="card-rating">
						{avgRating && !Number.isNaN(Number(avgRating)) ? (
							<>
								<span>{avgRating}</span>
								<span className="card-star">★</span>
							</>
						) : (
							<>
								<span>{avgRating}</span>
								<span className="card-star">☆</span>
							</>
						)}
					</div>
				</Card.Header>
				<div className="card-image m-auto p-2 h-100">
					<img src={image?.url} alt={title} className="w-100" />
				</div>
				<Card.Footer className="text-center h-100">
					<div sm="12" className="footer-col">
						<span>
							{title} ({year})
						</span>
					</div>
				</Card.Footer>
			</Card>
		</Link>
	);
};
export default MediaCard;
