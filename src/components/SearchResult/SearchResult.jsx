import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function SearchResult() {
  const movieListReducer = useSelector((store) => store.movieListReducer);
  const isMovieError = movieListReducer.Error !== undefined;
  const history = useHistory()
  const dispatch = useDispatch();

  const handleClick = () => {
    history.push("/details");
  };

  if (isMovieError) {
    return (
      <div>
        There is no movie with that name. Please refine search query and try
        again.
      </div>
    );
  } else {
    return (
      <div>
        {movieListReducer.Search?.map((movie, i) => (
          <div key={i}>
            <div onClick={handleClick}>
              <img src={movie.Poster}></img>
              <p>
                {movie.Title} ({movie.Year})
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default SearchResult;
