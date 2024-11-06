import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Button, Row, Col, Card, Container } from 'react-bootstrap';

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const storedToken = localStorage.getItem('token');
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);

	//authenticate requests to API through user token
	useEffect(() => {
		if (!token) {
			return;
		}

		fetch('https://my-flix-2-a94518576195.herokuapp.com/movies', {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				const moviesFromApi = data.map((movie) => ({
					id: movie._id,
					Title: movie.title,
					Description: movie.description,
					Genre: movie.genre.name,
					Director:
						movie.director.first_name +
						' ' +
						movie.director.last_name,
					Image: movie.image,
				}));
				setMovies(moviesFromApi);
			});
	}, [token]);

	return (
		<Row className="justify-content-md-center">
			{!user ? (
				<Col md={10} className="d-flex justify-content-around">
					{/* Conditional Login/Signup Card */}
					<Card style={{ width: '45%' }}>
						<Card.Body>
							<Card.Title>
								{showLogin ? 'Login' : 'Signup'}
							</Card.Title>
							{/* Render Login or Signup based on showLogin */}
							{showLogin ? (
								<LoginView
									onLoggedIn={(user) => setUser(user)}
								/>
							) : (
								<SignupView />
							)}
							{/* Toggle Button */}
							<Button variant="link" onClick={toggleView}>
								{showLogin
									? "Don't have an account? Sign up"
									: 'Already have an account? Log in'}
							</Button>
						</Card.Body>
					</Card>
				</Col>
			) : selectedMovie ? (
				<Col md={8}>
					<MovieView
						movieData={selectedMovie}
						onBackClick={() => setSelectedMovie(null)}
					/>
				</Col>
			) : (
				<>
					{movies.map((movie) => (
						<Col className="mb-5" key={movie.id} md={3}>
							<MovieCard
								key={movie.id}
								movieData={movie}
								onMovieClick={(movie) => {
									setSelectedMovie(movie);
								}}
							/>
						</Col>
					))}
					{/* Logout Button only shows on movie selection*/}
					{user && (
						<Col md={10} className="d-flex justify-content-center">
							<Button
								onClick={() => {
									setUser(null);
									setToken(null);
									localStorage.clear();
								}}
							>
								Logout
							</Button>
						</Col>
					)}
				</>
			)}
		</Row>
	);
};
