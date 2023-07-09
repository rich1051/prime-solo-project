import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./MovieItem.css";

function MovieItem({ movie }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    history.push("/details/" + movie.imdbID);
  };
  console.log("MOVIE IS:", movie);
  return (
    <div onClick={handleClick} className="movie-title-poster">
      <img className="movie-poster" src={movie.Poster}></img>
      <p className="movie-title">
        {movie.Title}
        <br></br>({movie.Year})
      </p>
    </div>
  );
}

export default MovieItem;
