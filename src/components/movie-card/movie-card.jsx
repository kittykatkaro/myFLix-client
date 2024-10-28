import PropTypes from 'prop-types';

export const MovieCard = ({ movieData, onMovieClick }) => {
	return (
		<div
			onClick={() => {
				onMovieClick(movieData);
			}}
		>
			{movieData.Title}
		</div>
	);
};

//define all prop contrains for the MovieCard component
MovieCard.propTypes = {
	movieData: PropTypes.shape({
		Title: PropTypes.string.isRequired,
	}).isRequired,
	onMovieClick: PropTypes.func.isRequired,
};
