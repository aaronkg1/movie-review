import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "../utilities/Spinner";
import MediaCard from "../MediaCard";
import { getGenres } from "../../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormSelect from "react-bootstrap/esm/FormSelect";
import {
	getShowCount,
	getShows,
	getShowsByPageNumber,
} from "../../actions/tvshows";

const ShowIndex = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { shows, count } = useSelector((state) => state.shows);
	const { pageNumber } = useParams();
	const [pageNumbers, setPageNumbers] = useState([]);
	const [genres, setGenres] = useState([]);
	const [hasError, setHasError] = useState({
		status: false,
		message: "",
	});

	useEffect(() => {
		dispatch(getShowCount());
	}, [dispatch]);

	useEffect(() => {
		try {
			const numberOfPages = Math.ceil(count / 16);
			setPageNumbers(Array(numberOfPages).fill(""));
		} catch (error) {
			setHasError({
				status: true,
				message: error,
			});
		}
	}, [count]);

	useEffect(() => {
		dispatch(getShows());
	}, [dispatch]);

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const { data } = await getGenres();
				setGenres(data);
			} catch (error) {
				setHasError({
					status: true,
					message: error.message,
				});
			}
		};
		fetchGenres();
	}, []);

	useEffect(() => {
		const getByPageNumber = async () => {
			try {
				if (pageNumber) {
					console.log(pageNumber);
					dispatch(getShowsByPageNumber(pageNumber));
				}
			} catch (error) {
				setHasError({ status: true, message: error.message });
			}
		};
		getByPageNumber();
	}, [pageNumber, dispatch]);

	const handleGenreSelect = (e) => {
		return navigate(`/tvshows/genre/${e.target.value}`);
	};

	return (
		<Container className="mt-4">
			<h1 className="index-title">TV Shows</h1>
			<Row className="mt-4">
				<Col lg="2" className="genre-list">
					<h2>Genres</h2>
					<ul className="collapsible-list">
						{genres.length !== 0 &&
							genres.map((genre) => {
								return (
									<li key={genre._id}>
										<Link
											to={`/tvshows/genre/${genre._id}`}
											className="nav-link"
										>
											{genre.title}
										</Link>
									</li>
								);
							})}
					</ul>
				</Col>
				<Col xs="7" className="genre-dropdown mb-4">
					<h2>Genres</h2>
					<FormSelect onChange={handleGenreSelect}>
						{genres.length !== 0 &&
							genres.map((genre) => {
								return (
									<option key={genre._id} value={genre._id}>
										{genre.title}
									</option>
								);
							})}
					</FormSelect>
				</Col>
				{shows.length ? (
					<Col lg="10" className="media-index">
						<Row>
							{shows.map((show) => {
								const { _id } = show;
								return (
									<Col md="6" lg="3" xs="6" className="movie mb-4" key={_id}>
										<MediaCard media={show} />
									</Col>
								);
							})}
						</Row>
						<ul className="page-numbers">
							{pageNumbers.map((num, index) => {
								return (
									<li key={`page${index}`}>
										<Link to={`/tvshows/page/${index + 1}`}>{index + 1}</Link>
									</li>
								);
							})}
						</ul>
					</Col>
				) : hasError.status ? (
					<h2 className="error">Could not load TV shows</h2>
				) : (
					<Spinner />
				)}
			</Row>
		</Container>
	);
};

export default ShowIndex;
