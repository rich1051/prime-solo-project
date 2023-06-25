import { useSelector } from "react-redux";

const SearchResult = () => {
  const movieListReducer = useSelector((store) => store.movieListReducer);

  return (
    <div>
      {movieListReducer.map((movie, i) => (
        <div key={i}>
          <img src={movie.images.original.url}></img>
        </div>
      ))}
    </div>
  );
};
export default SearchResult;
