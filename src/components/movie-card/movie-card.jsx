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
