import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
	const [movies, setMovies] = useState([
		{
			id: 1,
			Title: 'Inception',
			Director: 'Christopher Nolan',
			Genre: 'Action, Adventure, Sci-Fi',
			Description:
				'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
			image: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg',
		},
		{
			id: 2,
			Title: 'The Shawshank Redemption',
			Director: 'Frank Darabont',
			Genre: 'Drama',
			Description:
				'A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion.',
			image: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg',
		},
		{
			id: 3,
			Title: 'The Godfather',
			Director: 'Francis Ford Coppola',
			Genre: 'Crime, Drama',
			Description:
				'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
			image: 'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg',
		},
	]);

	const [selectedMovie, setSelectedMovie] = useState(null);

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
