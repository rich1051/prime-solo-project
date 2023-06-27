import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import AddRecipe from "../AddRecipe/AddRecipe";

function DetailsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const detailsReducer = useSelector((store) => store.detailsReducer);
  const params = useParams();

  const handleBack = () => {
    history.push("/");
  };

  console.log(detailsReducer);
  useEffect(() => {
    dispatch({
      type: "FETCH_DETAILS",
      payload: params.imdbID,
    });
  }, []);
  console.log("imdbID IS:", params);
  return (
    <>
      <div className="details">
        <div key={detailsReducer.imdbID}>
          <h3 className="details-title">
            {detailsReducer.Title} ({detailsReducer.Year})
          </h3>
          <img
            className="details-image"
            src={detailsReducer.Poster}
            alt={detailsReducer.Title}
          />
          <p className="details-information">
            Rating: {detailsReducer.Rated}
            <br />
            Director(s): {detailsReducer.Director}
            <br />
            Cast: {detailsReducer.Actors}
          </p>
          <p className="details-description">
            Plot: {detailsReducer.Plot}
          </p>
        </div>
        <br />
      </div>
      <AddRecipe />
      <button onClick={handleBack}>Back</button>
    </>
  );
}

export default DetailsPage;
