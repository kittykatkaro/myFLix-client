import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);

	// fetch movies from API
	useEffect(() => {
		fetch('https://my-flix-2-a94518576195.herokuapp.com/movies')
			.then((response) => response.json())
			.then((data) => {
				console.log('movies from api', data);
				const moviesFromApi = data.map((movie) => ({
					id: movie._id,
					Title: movie.title,
					Description: movie.description,
					Genre: movie.genre.name,
					Director: movie.director.name,
					image: movie.imagePath,
				}));
				setMovies(moviesFromApi);
			});
	}, []);

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
		</div>
	);
};
