import { useSelector } from "react-redux";

const SearchResult = () => {
  const movieListReducer = useSelector((store) => store.movieListReducer);
  const isMovieError = movieListReducer.Error !== undefined 

  if (isMovieError) {
    return (
      <div>There is no movie with that name. Please refine search query and try again.</div>
    )
  } else {
  return (
    <div>
      {movieListReducer.Search?.map((movie, i) => (
        <div key={i}>
          <img src={movie.Poster}></img>
          <p>{movie.Title}</p>
        </div>
      ))}
    </div>
  );
}};

export default SearchResult;
