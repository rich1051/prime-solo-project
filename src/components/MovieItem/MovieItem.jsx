import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function MovieItem( {movie} ) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    dispatch({
      type: "FETCH_DETAILS",
      payload: movie.id,
    });
    history.push("/details");
  };

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
