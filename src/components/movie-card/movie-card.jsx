import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
	return (
		<Card className="h-100">
			<Card.Img variant="top" src={movie.Image} />
			<Card.Body>
				<Card.Title>{movie.Title}</Card.Title>
				<Card.Text>{movie.Genre}</Card.Text>
				<Link to={`/movies/${encodeURIComponent(movie._id)}`}>
					<Button variant="primary">Open</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};

//define all prop contrains for the MovieCard component
MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
	}).isRequired,
};
