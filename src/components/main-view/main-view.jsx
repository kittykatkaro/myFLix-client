import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

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
					Director: movie.director.name,
					Image: movie.image,
				}));
				setMovies(moviesFromApi);
			});
	}, [token]);

	if (!user) {
		return (
			<>
				<LoginView
					onLoggedIn={(user, token) => {
						setUser(user);
						setToken(token);
					}}
				/>
				or
				<SignupView />
			</>
		);
	}

	if (selectedMovie)
		return (
			<MovieView
				movieData={selectedMovie}
				onBackClick={() => setSelectedMovie(null)}
			/>
		);

	if (movies.length === 0) {
		return <div className="main-view">The list is empty!</div>;
	}

	return (
		<div>
			{movies.map((movie) => (
				<MovieCard
					key={movie.id}
					movieData={movie}
					onMovieClick={(newSelectedMovie) => {
						setSelectedMovie(newSelectedMovie);
					}}
				/>
			))}

			<button
				onClick={() => {
					setUser(null);
					setToken(null);
					localStorage.clear();
				}}
				className="back-button"
				style={{ cursor: 'pointer' }}
			>
				Logout
			</button>
		</div>
	);
};
