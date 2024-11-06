import './movie-view.scss';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const MovieView = ({ movies }) => {
	const { movieId } = useParams();
	const movie = movies.find((movie) => movie.id === movieId);

	return (
		<div>
			<div>
				<img src={movie.Image} />
			</div>
			<div>
				<span>Title: </span>
				<span>{movie.Title}</span>
			</div>
			<div>
				<span>Director: </span>
				<span>{movie.Director}</span>
			</div>
			<div>
				<span>Genre: </span>
				<span>{movie.Genre}</span>
			</div>
			<div>
				<span>Description: </span>
				<span>{movie.Description}</span>
			</div>
			<Link to={'/'}>
				<button className="back-button">Back</button>
			</Link>
		</div>
	);
};
