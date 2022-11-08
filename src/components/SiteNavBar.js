import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { userIsAuthenticated } from "../utils/auth";
import { useDispatch } from "react-redux";
import { checkForToken, logout } from "../actions/auth";
import MediaSearchBar from "./MediaSearchBar";

const SiteNavBar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
	};
	useEffect(() => {
		dispatch(checkForToken());
	}, [dispatch]);

	return (
		<Navbar expand="md">
			<Container>
				<Navbar.Brand href="/" className="">
					<h1>🎬</h1>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse className="justify-content-start">
					<Nav.Item className="p-1">
						<MediaSearchBar />
					</Nav.Item>
				</Navbar.Collapse>
				<Navbar.Collapse className="justify-content-end">
					<Nav.Item className="p-1">
						<Link className="btn btn-warning" to="/movies">
							Movies
						</Link>
					</Nav.Item>
					<Nav.Item className="p-1">
						<Link className="btn btn-warning" to="/tvshows">
							TV Shows
						</Link>
					</Nav.Item>
					{userIsAuthenticated() ? (
						<>
							<Nav.Item className="p-1">
								<Link className="btn btn-warning" to="/addnew">
									Add New
								</Link>
							</Nav.Item>
							<Nav.Item className="p-1">
								<Link to="/profile">
									<span>Profile</span>
								</Link>
							</Nav.Item>
							<Nav.Item onClick={handleLogout} className="p-1">
								<Link to="/">
									<span>Logout</span>
								</Link>
							</Nav.Item>
						</>
					) : (
						<>
							<Nav.Item className="p-1">
								<Link to="register">Register</Link>
							</Nav.Item>
							<Nav.Item className="p-1">
								<Link to="login">Login</Link>
							</Nav.Item>
						</>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default SiteNavBar;
