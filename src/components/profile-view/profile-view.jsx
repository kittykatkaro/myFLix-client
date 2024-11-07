import { useState } from 'react';
import { Button, Form, Card, Carousel } from 'react-bootstrap';

export const ProfileView = ({ movies }) => {
	const localUser = JSON.parse(localStorage.getItem('user'));

	const [username, setUsername] = useState(localUser.Username || '');
	const [password, setPassword] = useState(localUser.Password || '');
	const [email, setEmail] = useState(localUser.Email || '');
	const [birthday, setBirthday] = useState(
		localUser.Birthday || '01/01/0001'
	);
	// const [favoriteMovies, setFavoriteMovies] = useState(
	// 	localUser.favorites || []
	// );

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
			Email: email,
			Birthday: birthday,
		};

		fetch('https://my-flix-2-a94518576195.herokuapp.com/users/:username', {
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
		<>
			<Card>
				<Card.Body>
					<Card.Title>{localUser.username}</Card.Title>
					<Card.Text>Email: {localUser.email}</Card.Text>
					<Card.Text>Birthday: {localUser.birthday}</Card.Text>
					<Card.Text>
						Favorite Movies:{' '}
						{localUser.favorites
							? localUser.favorites.join(', ')
							: 'None'}
					</Card.Text>
				</Card.Body>
			</Card>
			<Card>
				<Card.Body>
					<Card.Title>Edit Profile</Card.Title>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formUsername">
							<Form.Label>Username:</Form.Label>
							<Form.Control
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
								minLength="4"
							/>
						</Form.Group>
						<Form.Group controlId="formPassword">
							<Form.Label>Password:</Form.Label>
							<Form.Control
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="formEmail">
							<Form.Label>Email:</Form.Label>
							<Form.Control
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="formBdate">
							<Form.Label>Birthday:</Form.Label>
							<Form.Control
								type="date"
								value={birthday}
								onChange={(e) => setBirthday(e.target.value)}
								required
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Edit Profile
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</>
	);
};
