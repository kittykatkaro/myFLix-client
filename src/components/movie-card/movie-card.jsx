import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export const MovieCard = ({ movie, updateUser }) => {
	const user = JSON.parse(localStorage.getItem('user'));
	const token = localStorage.getItem('token');

	const isFav = user.favorites.includes(movie.id);

	// user adds movie to favorites
	const addFav = (movieId) => {
		fetch(
			`https://my-flix-2-a94518576195.herokuapp.com/users/${user.username}/movies/${movieId}`,
			{
				method: 'PUT',
				headers: { Authorization: `Bearer ${token}` },
			}
		)
			.then((response) => response.json())
			.then((user) => {
				updateUser(user);
			});
	};

	// user removes movie from favorites
	const removeFav = (movieId) => {
		fetch(
			`https://my-flix-2-a94518576195.herokuapp.com/users/${user.username}/movies/${movieId}`,
			{
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			}
		)
			.then((response) => response.json())
			.then((user) => {
				updateUser(user);
			});
	};

	return (
		<Card className="h-100">
			<Card.Img variant="top" src={movie.Image} className="movie_img" />
			<Card.Body>
				<Card.Title className="movie_title">{movie.Title}</Card.Title>
				<Card.Text>{movie.Genre}</Card.Text>
				<Link to={`/movies/${encodeURIComponent(movie.id)}`}>
					<Button variant="primary">Open</Button>
				</Link>
				<div className="fav_button">
					{!isFav ? (
						<Button
							variant="warning"
							onClick={() => addFav(movie.id)}
						>
							<FaRegHeart />
						</Button>
					) : (
						<Button
							variant="danger"
							onClick={() => removeFav(movie.id)}
						>
							<FaHeart />
						</Button>
					)}
				</div>
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
