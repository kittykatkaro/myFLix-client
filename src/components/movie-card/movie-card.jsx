import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movieData, onMovieClick }) => {
	return (
		<Card>
			<Card.Img variant="top" src={movieData.Image} />
			<Card.Body>
				<Card.Title>{movieData.Title}</Card.Title>
				<Card.Text>{movieData.Description}</Card.Text>
				<Button onClick={() => onMovieClick(movieData)} variant="link">
					Open
				</Button>
			</Card.Body>
		</Card>
	);
};

//define all prop contrains for the MovieCard component
MovieCard.propTypes = {
	movieData: PropTypes.shape({
		Title: PropTypes.string.isRequired,
	}).isRequired,
	onMovieClick: PropTypes.func.isRequired,
};
