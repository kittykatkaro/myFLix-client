import './movie-view.scss';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const MovieView = ({ movies }) => {
	const { movieId } = useParams();
	const movie = movies.find((movie) => movie._id === movieId);

	return (
		<div>
			<div>
				<img src={movies.Image} />
			</div>
			<div>
				<span>Title: </span>
				<span>{movies.Title}</span>
			</div>
			<div>
				<span>Director: </span>
				<span>{movies.Director}</span>
			</div>
			<div>
				<span>Genre: </span>
				<span>{movies.Genre}</span>
			</div>
			<div>
				<span>Description: </span>
				<span>{movies.Description}</span>
			</div>
			<Link to={'/'}>
				<button className="back-button">Back</button>
			</Link>
		</div>
	);
};
