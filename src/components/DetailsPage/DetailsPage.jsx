import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import AddRecipeModal from "../AddRecipeModal/AddRecipeModal";
import RecipeList from "../RecipeList/RecipeList";
import "./DetailsPage.css";
import axios from "axios";

function DetailsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const detailsReducer = useSelector((store) => store.detailsReducer);
  const params = useParams();
  const [recipes, setRecipes] = useState([]);

  const imdbID = detailsReducer.imdbID;

  useEffect(() => {
    // Fetch recipes when the component mounts
    getRecipes();
  }, [imdbID]);

  const getRecipes = () => {
    console.log("GETRECIPES IS WORKING");
    axios
      .get(`/api/recipes/movie/${imdbID}`)
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.log("Error fetching recipes:", error);
      });
  };

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
        <div className="details" key={detailsReducer.imdbID}>
          <div className="details-no-description">
            <div className="details-title-image">
              <h3 className="details-title">
                {detailsReducer.Title} ({detailsReducer.Year})
              </h3>
              <img
                className="details-image"
                src={detailsReducer.Poster}
                alt={detailsReducer.Title}
              />
            </div>
            <p className="details-information">
              Rated: {detailsReducer.Rated}
              <br />
              Director(s): {detailsReducer.Director}
              <br />
              Cast: {detailsReducer.Actors}
              <br />
              IMDb Rating: {detailsReducer.imdbRating}
            </p>
          </div>
          <div>
          <p className="details-description">Plot: {detailsReducer.Plot}</p>
          </div>
        </div>
        <br />
      <AddRecipeModal refetch={getRecipes} />
      <RecipeList recipes={recipes} getRecipes={getRecipes} />
      <br />
      <button className="back-btn" onClick={handleBack}>
        Back
      </button>
    </>
  );
}

export default DetailsPage;
