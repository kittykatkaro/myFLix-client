import React from 'react';
import { Button, Form } from 'react-bootstrap';

export const SignupView = () => {
	const handleSubmit = (event) => {
		event.preventDefault();
		const username = event.target[0].value;
		const password = event.target[1].value;
		const email = event.target[2].value;
		const birthday = event.target[3].value;

		const data = {
			username: username,
			password: password,
			email: email,
			birthday: birthday,
		};
		fetch('https://my-flix-2-a94518576195.herokuapp.com/users', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((response) => {
			if (response.ok) {
				alert('Signup successful');
				window.location.reload();
			} else {
				alert('Signup failed');
			}
		});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="formUsername">
				<Form.Label>Username:</Form.Label>
				<Form.Control type="text" required minLength="3" />
			</Form.Group>
			<Form.Group controlId="formPassword">
				<Form.Label>Password:</Form.Label>
				<Form.Control type="password" required />
			</Form.Group>
			<Form.Group controlId="formEmail">
				<Form.Label>Email:</Form.Label>
				<Form.Control type="email" required />
			</Form.Group>
			<Form.Group controlId="formBirthday">
				<Form.Label>Birthday:</Form.Label>
				<Form.Control type="date" required />
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};
