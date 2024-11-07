import { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';

export const ProfileView = ({ movies }) => {
	const localUser = JSON.parse(localStorage.getItem('user'));

	if (!localUser) {
		return <p>Please log in to view and edit your profile.</p>;
	}

	const favMovies = movies.filter((movie) => {
		return localUser.FavoriteMovies.includes(movie._id);
	});

	const [username, setUsername] = useState(localUser.Username || '');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState(localUser.Email || '');
	const [birthday, setBirthday] = useState(
		localUser.Birthday || '01/01/0001'
	);

	const handleSubmit = (event) => {
		event.preventDefault();

		const updatedUser = {
			Username: username,
			Password: password,
			Email: email,
			Birthday: birthday,
		};

		fetch(
			`https://my-flix-2-a94518576195.herokuapp.com/users/${localUser.Username}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${localUser.Token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedUser),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				localStorage.setItem('user', JSON.stringify(data));
				alert('Profile updated successfully!');
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	return (
		<>
			<Card>
				<Card.Body>
					<Card.Title>{localUser.username}</Card.Title>
					<Card.Text>Email: {localUser.email}</Card.Text>
					<Card.Text>Birthday: {localUser.birthday}</Card.Text>
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
