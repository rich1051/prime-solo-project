import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function MovieItem( {movie} ) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    history.push("/details/"+movie.imdbID);
  };
  console.log('MOVIE IS:', movie)
  return (
    <div onClick={handleClick}>
      <img src={movie.Poster}></img>
      <p>
        {movie.Title} ({movie.Year})
      </p>
    </div>
  );
}

export default MovieItem;
