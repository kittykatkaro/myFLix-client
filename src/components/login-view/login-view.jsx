import React from 'react';
import { Button, Form } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			username: username,
			password: password,
		};

		fetch('https://my-flix-2-a94518576195.herokuapp.com/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Login response: ', data);
				if (data.user) {
					localStorage.setItem('user', JSON.stringify(data.user));
					localStorage.setItem('token', data.token);
					onLoggedIn(data.user, data.token);
				} else {
					alert('No such user');
				}
			})
			.catch((e) => {
				alert('Something went wrong');
			});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlID="formUsername">
				<Form.Label>Username:</Form.Label>
				<Form.Control
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					minLength="3"
				/>
			</Form.Group>
			<Form.Group controlID="formPassword">
				<Form.Label>Password:</Form.Label>
				<Form.Control
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};
