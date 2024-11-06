import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { Button, Row, Col, Card } from 'react-bootstrap';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const storedToken = localStorage.getItem('token');
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [movies, setMovies] = useState([]);
	const [loading, setIsLoading] = useState(true);

	// Load user and token from localStorage on component mount
	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem('user'));
		const storedToken = localStorage.getItem('token');

		if (storedUser && storedToken) {
			setUser(storedUser);
			setToken(storedToken);
		}
		setIsLoading(false); // Loading is complete
	}, []);

	// Fetch movies when token changes
	useEffect(() => {
		if (!token) {
			return;
		}

		setIsLoading(true); // start loading while fetching data
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
				setIsLoading(false); // stop loading when data is fetched
			});
	}, [token]);

	return (
		<BrowserRouter>
			<NavigationBar user={user} onLoggedOut={() => setUser(null)} />
			<Row className="justify-content-md-center">
				<Routes>
					<Route
						path="/signup"
						element={
							<>
								{user ? (
									<Navigate to="/" />
								) : (
									<Col md={5}>
										<SignupView />
									</Col>
								)}
							</>
						}
					/>
					<Route
						path="/login"
						element={
							<>
								{user ? (
									<Navigate to="/" />
								) : (
									<Col md={5}>
										<LoginView
											onLoggedIn={(user, token) => {
												setUser(user);
												setToken(token);
												localStorage.setItem(
													'user',
													JSON.stringify(user)
												);
												localStorage.setItem(
													'token',
													token
												);
											}}
										/>
									</Col>
								)}
							</>
						}
					/>
					<Route
						path="/movies/:movieId"
						element={
							<>
								{!user ? (
									<Navigate to="/login" replace />
								) : loading ? (
									<Col>Loading...</Col>
								) : movies.length === 0 ? (
									<Col>The list is empty!</Col>
								) : (
									<Col md={8}>
										<MovieView movies={movies} />
									</Col>
								)}
							</>
						}
					/>
					<Route
						path="/"
						element={
							<>
								{!user ? (
									<Navigate to="/login" replace />
								) : loading ? (
									<Col>Loading...</Col>
								) : movies.length === 0 ? (
									<Col>The list is empty!</Col>
								) : (
									<>
										{movies.map((movie) => (
											<Col
												className="mb-4"
												key={movie.id}
												md={3}
											>
												<MovieCard movie={movie} />
											</Col>
										))}
									</>
								)}
							</>
						}
					/>
					<Route
						path="/profile"
						element={
							<>
								{!user ? (
									<Navigate to="/login" replace />
								) : (
									<Col md={5}>
										<ProfileView />
									</Col>
								)}
							</>
						}
					/>
				</Routes>
			</Row>
		</BrowserRouter>
	);
};
