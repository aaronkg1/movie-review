import React, { useState } from "react";
// useNavigate allows redirection to different routes
import { useNavigate } from "react-router-dom";
// Import Bootstrap Components
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { registerUser } from "../../api";

const Register = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		username: "",
		email: "",
		password: "",
		passwordConfirmation: "",
	});
	const [formErrors, setFormErrors] = useState({
		username: "",
		email: "",
		password: "",
		passwordConfirmation: "",
	});
	const handleChange = (e) => {
		setFormErrors({
			...formErrors,
			[e.target.name]: "",
		});
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await registerUser(userData);
			navigate("/login");
		} catch (err) {
			setFormErrors({ ...formErrors, ...err.response.data.errors });
		}
	};
	return (
		<div className="form-page mt-4">
			<Container>
				<Form>
					<h2>Register</h2>
					<Form.Group className="mb-2">
						<Form.Label htmlFor="email">Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter Email"
							name="email"
							value={userData.email}
							onChange={handleChange}
							required
						></Form.Control>
						{formErrors.email && <Form.Text>Email Invalid</Form.Text>}
					</Form.Group>
					<Form.Group className="mb-2">
						<Form.Label htmlFor="username">Username</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Username"
							name="username"
							value={userData.username}
							onChange={handleChange}
							required
						></Form.Control>
						{formErrors.username && (
							<Form.Text>{formErrors.username}</Form.Text>
						)}
					</Form.Group>
					<Form.Group className="mb-2">
						<Form.Label htmlFor="password">Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							name="password"
							value={userData.password}
							onChange={handleChange}
							required
						></Form.Control>
						{formErrors.password && (
							<Form.Text>{formErrors.password}</Form.Text>
						)}
					</Form.Group>
					<Form.Group className="mb-2">
						<Form.Label htmlFor="passwordConfirmation">
							Confirm Password
						</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm Password"
							name="passwordConfirmation"
							value={userData.passwordConfirmation}
							onChange={handleChange}
							required
						></Form.Control>
						{formErrors.passwordConfirmation && (
							<Form.Text>{formErrors.passwordConfirmation}</Form.Text>
						)}
					</Form.Group>
					<Form.Group className="text-center mt-4">
						<Button variant="warning" onClick={handleSubmit}>
							Submit
						</Button>
					</Form.Group>
				</Form>
			</Container>
		</div>
	);
};

export default Register;
