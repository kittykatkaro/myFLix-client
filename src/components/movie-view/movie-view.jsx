export const MovieView = ({ movieData, onBackClick }) => {
	return (
		<div>
			<div>
				<img src={movieData.Image} />
			</div>
			<div>
				<span>Title: </span>
				<span>{movieData.Title}</span>
			</div>
			<div>
				<span>Director: </span>
				<span>{movieData.Director}</span>
			</div>
			<div>
				<span>Genre: </span>
				<span>{movieData.Genre}</span>
			</div>
			<div>
				<span>Description: </span>
				<span>{movieData.Description}</span>
			</div>
			<button onClick={onBackClick}>Back</button>
		</div>
	);
};
