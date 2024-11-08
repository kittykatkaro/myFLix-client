import moment from 'moment';
import { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ movies, updateUser }) => {
	// Get user data from localStorage
	const localUser = JSON.parse(localStorage.getItem('user'));
	const localToken = localStorage.getItem('token');

	// Set initial state to user data
	const [username, setUsername] = useState(localUser.username || '');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState(localUser.email || '');
	const [birthday, setBirthday] = useState(localUser.birthday);

	// Handle form submission to update user data
	const handleSubmit = (e) => {
		e.preventDefault();

		// Collect only the fields that have changed (i.e., non-empty)
		const data = { username, password, email, birthday };

		// Only send data if there is something to update
		if (Object.keys(data).length > 0) {
			fetch(
				`https://my-flix-2-a94518576195.herokuapp.com/users/${localUser.username}`,
				{
					method: 'PUT',
					body: JSON.stringify(data),
					headers: {
						Authorization: `Bearer ${localToken}`,
						'Content-Type': 'application/json',
					},
				}
			).then((response) => {
				if (response.ok) {
					response.json().then((user) => {
						console.log('updated user', user);
						updateUser(user);
						alert('Profile updated successfully');
					});
				} else {
					alert('Failed to update profile');
				}
			});
		} else {
			alert('No changes to update');
		}
	};

	return (
		<>
			<Card>
				<Card.Body>
					<Card.Title>{localUser.username}</Card.Title>
					<Card.Text>Email: {localUser.email}</Card.Text>
					<Card.Text>
						Birthday:{' '}
						{moment(localUser.birthday).format(
							'MMMM Do YYYY, h:mm:ss a'
						)}
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
								minLength="4"
							/>
						</Form.Group>
						<Form.Group controlId="formPassword">
							<Form.Label>Password:</Form.Label>
							<Form.Control
								type="password"
								value={password}
								required
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formEmail">
							<Form.Label>Email:</Form.Label>
							<Form.Control
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formBdate">
							<Form.Label>Birthday:</Form.Label>
							<Form.Control
								type="date"
								value={moment(birthday).format('YYYY-MM-DD')}
								onChange={(e) => setBirthday(e.target.value)}
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Edit Profile
						</Button>
					</Form>
				</Card.Body>
			</Card>

			{/* Favorite Movies */}
			<div className="favorite_movies">
				<h2>Favorite Movies</h2>
				{localUser.favorites.length > 0 ? (
					movies
						.filter((movie) =>
							localUser.favorites.includes(movie.id)
						)
						.map((movie) => (
							<MovieCard
								key={movie.id}
								movie={movie}
								updateUser={updateUser}
							/>
						))
				) : (
					<p>No favorite movies yet</p>
				)}
			</div>
		</>
	);
};
