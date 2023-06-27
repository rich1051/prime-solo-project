import { useSelector } from "react-redux";
import MovieItem from "../MovieItem/MovieItem";

function MovieList() {
  const movieListReducer = useSelector((store) => store.movieListReducer);
  const isMovieError = movieListReducer.Error !== undefined;

  if (isMovieError) {
    return (
      <div>
        There is no movie with that name or there are too many movies with the
        specified parameters. Please refine search query and try again.
      </div>
    );
  } else {
    return (
      <div>
        {movieListReducer.Search?.map((movie, i) => (
          <div key={i}>
            <MovieItem movie={movie} />
          </div>
        ))}
      </div>
    );
  }
}

export default MovieList;
