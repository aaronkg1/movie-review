import React, { useEffect, useRef, useState } from "react";
// useNavigate allows redirection to different routes
import { useNavigate } from "react-router-dom";
// Import Bootstrap Components
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getGenres, postMovie, postShow } from "../api";

const MediaForm = () => {
	const navigate = useNavigate();
	const buttonRef = useRef();

	const [genres, setGenres] = useState([]);
	const [currentGenre, setCurrentGenre] = useState({});
	const [mediaData, setMediaData] = useState({
		type: "movie",
		season: "",
		title: "",
		year: "",
		director: "",
		cast: [],
		genre: [],
		image: "",
	});
	const [castMember, setCastMember] = useState("");
	const [season, setSeason] = useState(1);
	const [formErrors, setFormErrors] = useState({
		type: "",
		title: "",
		year: "",
		director: "",
		cast: "",
		genre: "",
		image: "",
	});

	useEffect(() => {
		const getAsyncGenres = async () => {
			try {
				const { data } = await getGenres();
				setGenres(data);
				setCurrentGenre(data[0]._id);
			} catch (err) {
				setFormErrors({ genre: "Genres not found" });
			}
		};
		getAsyncGenres();
	}, []);
	const handleChange = (e) => {
		setFormErrors({
			...formErrors,
			[e.target.name]: "",
		});
		setMediaData({
			...mediaData,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const mediaDataCopy = { ...mediaData };
		if (mediaData.type === "series") mediaDataCopy.season = season;
		try {
			const { data } =
				mediaData.type === "movie"
					? await postMovie(mediaDataCopy)
					: await postShow(mediaDataCopy);
			console.log(data);
			if (data.movie) {
				return navigate(`/movies/${data.movie._id}`);
			}
			return navigate(`/tvshows/${data.show._id}`);
		} catch (err) {
			console.log(err);
			setFormErrors({ ...formErrors, ...err.response.data.errors });
		}
	};
	const addCast = (e) => {
		e.preventDefault();
		setFormErrors({
			...formErrors,
			cast: "",
		});
		if (!castMember.length) return;
		setMediaData({ ...mediaData, cast: [...mediaData.cast, castMember] });
		setCastMember("");
	};
	const removeCastMember = (index) => {
		const castCopy = [...mediaData.cast];
		castCopy.splice(index, 1);
		setMediaData({ ...mediaData, cast: castCopy });
	};
	const addGenre = (e) => {
		e.preventDefault();
		setFormErrors({
			...formErrors,
			genre: "",
		});
		if (!currentGenre) return;
		if (mediaData.genre.some((genre) => genre._id === currentGenre)) return;
		const genreObj = genres.find((genre) => {
			return genre._id === currentGenre;
		});
		setMediaData({ ...mediaData, genre: [...mediaData.genre, genreObj] });
		setCurrentGenre(genres[0]._id);
	};
	const removeGenre = (index) => {
		const genreCopy = [...mediaData.genre];
		genreCopy.splice(index, 1);
		setMediaData({ ...mediaData, genre: genreCopy });
	};

	return (
		<div className="form-page mt-4">
			<Container>
				<Form>
					<h2>Add New</h2>
					<Form.Group className="mb-2">
						<Form.Label htmlFor="type">Type</Form.Label>
						<Form.Select
							type="select"
							name="type"
							value={mediaData.type}
							onChange={handleChange}
							required
						>
							<option value="movie">Movie</option>
							<option value="series">TV Show</option>
						</Form.Select>
						{formErrors.type.message && (
							<Form.Text>Please select a type</Form.Text>
						)}
					</Form.Group>
					<Form.Group className="mb-2">
						<Form.Label htmlFor="title">Title</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Title"
							name="title"
							value={mediaData.title}
							onChange={handleChange}
							required
						></Form.Control>
						{formErrors.title && <Form.Text>Title Required</Form.Text>}
					</Form.Group>
					{mediaData.type.length && mediaData.type === "series" ? (
						<Form.Group className="mb-2">
							<Form.Label htmlFor="season">Season</Form.Label>
							<Form.Control
								type="number"
								name="season"
								value={season}
								onChange={(e) => {
									setSeason(e.target.value);
								}}
								required
							></Form.Control>
							{formErrors.season && <Form.Text>Season Required</Form.Text>}
						</Form.Group>
					) : null}
					<Form.Group className="mb-2">
						<Form.Label htmlFor="year">Year</Form.Label>
						<Form.Control
							type="number"
							placeholder="Year"
							name="year"
							value={mediaData.year}
							onChange={handleChange}
							min="1900"
							max="3000"
							required
						></Form.Control>
						{formErrors.year && <Form.Text>Year Required</Form.Text>}
					</Form.Group>
					<Form.Label htmlFor="genre">Genre</Form.Label>
					<ul className="form-list">
						{mediaData.genre.length !== 0 &&
							mediaData.genre.map((genre, index) => {
								return (
									<li key={genre._id} className={`genre-item shadow-lg mb-2`}>
										<span className="actor-name">{genre.title}</span>
										<Button
											variant="danger"
											size="sm"
											onClick={() => {
												removeGenre(index);
											}}
										>
											X
										</Button>
									</li>
								);
							})}
					</ul>
					<Form.Group className="mb-2 input-group media-form-prepend">
						<div className="input-group-prepend">
							<span
								onClick={addGenre}
								className="btn btn-success input-group-text"
							>
								Add +
							</span>
						</div>
						<Form.Select
							name="genre"
							value={currentGenre}
							onChange={(e) => {
								setCurrentGenre(e.target.value);
							}}
							required
						>
							{genres.length !== 0 &&
								genres.map((genre) => {
									return (
										<option key={genre._id} value={genre._id}>
											{genre.title}
										</option>
									);
								})}
						</Form.Select>
					</Form.Group>
					{formErrors.genre && (
						<Form.Text>At least on genre required</Form.Text>
					)}

					<ul className="form-list">
						{mediaData.cast.length !== 0 &&
							mediaData.cast.map((actor, index) => {
								return (
									<li key={actor} className={`cast-item shadow-lg mb-2`}>
										<span className="actor-name">{actor}</span>
										<Button
											variant="danger"
											size="sm"
											onClick={() => {
												removeCastMember(index);
											}}
										>
											X
										</Button>
									</li>
								);
							})}
					</ul>
					<Form.Label htmlFor="cast">Cast</Form.Label>
					<Form.Group className="mb-2 input-group media-form-prepend">
						<div className="input-group-prepend">
							<span
								onClick={addCast}
								className="btn btn-success input-group-text"
							>
								Add +
							</span>
						</div>
						<Form.Control
							type="text"
							placeholder="Cast member"
							name="cast"
							value={castMember}
							onChange={(e) => {
								setCastMember(e.target.value);
							}}
							required
						/>
					</Form.Group>
					{formErrors.cast && (
						<Form.Text>At least one cast member required</Form.Text>
					)}
					<Form.Group className="mb-2">
						<Form.Label htmlFor="director">Director</Form.Label>
						<Form.Control
							type="text"
							placeholder="Director"
							name="director"
							value={mediaData.director}
							onChange={handleChange}
							required
						></Form.Control>
						{formErrors.director && <Form.Text>Director required</Form.Text>}
					</Form.Group>
					<Form.Group className="mb-2">
						<Form.Label htmlFor="description">Description</Form.Label>
						<Form.Control
							as="textarea"
							placeholder="Description"
							name="description"
							value={mediaData.description}
							onChange={handleChange}
							maxLength={300}
							required
						></Form.Control>
						{formErrors.description && (
							<Form.Text>Description required</Form.Text>
						)}
					</Form.Group>
					<Form.Group className="mb-2">
						<Form.Label htmlFor="image">Image Url</Form.Label>
						<Form.Control
							type="text"
							placeholder="Image Url"
							name="image"
							value={mediaData.image}
							onChange={handleChange}
							required
						></Form.Control>
						{formErrors.image && <Form.Text>{formErrors.image}</Form.Text>}
					</Form.Group>
					<Form.Group className="text-center mt-4">
						<Button variant="warning" onClick={handleSubmit} ref={buttonRef}>
							Submit
						</Button>
					</Form.Group>
				</Form>
			</Container>
		</div>
	);
};

export default MediaForm;
