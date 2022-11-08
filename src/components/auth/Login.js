import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/auth";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const authStatus = useSelector((state) => state.auth.status);
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});
	const [formError, setFormError] = useState("");
	const handleChange = (e) => {
		setFormError("");
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(login(userData));
			if (authStatus) navigate("/movies");
			else {
				setFormError("Login failed");
			}
		} catch (err) {
			setFormError(err.response.data.message);
		}
	};
	return (
		<div className="form-page mt-4">
			<Container>
				<Form onSubmit={handleSubmit}>
					<h2>Login</h2>
					<Form.Group className="mb-2">
						<Form.Label htmlFor="email">Email</Form.Label>
						<Form.Control
							type="email"
							name="email"
							placeholder="Email"
							defaultValue={userData.email}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-2">
						<Form.Label htmlFor="password">Password</Form.Label>
						<Form.Control
							type="password"
							name="password"
							placeholder="Password"
							defaultValue={userData.password}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Form.Group className="text-center mt-4">
						<Button variant="warning" type="submit">
							Login
						</Button>
					</Form.Group>
					{formError && (
						<Form.Group className="text-center">
							{" "}
							<Form.Text>{formError}</Form.Text>
						</Form.Group>
					)}
				</Form>
			</Container>
		</div>
	);
};

export default Login;
