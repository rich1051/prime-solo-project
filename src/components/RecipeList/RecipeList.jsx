import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./RecipeList.css";
import RecipeItem from "../RecipeItem/RecipeItem";

function RecipeList({ imdbId }) {
  const getRecipeReducer = useSelector((store) => store.getRecipeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch recipes when the component mounts
    getRecipes();
  }, [imdbId]);

  const getRecipes = () => {
    axios
      .get(`/api/recipes/`)
      .then((response) => {
        dispatch({
          type: "SET_RECIPES",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("Error fetching recipes:", error);
      });
  };


  return (
    <div>
      {getRecipeReducer.length === 0 ? (
        <div>
          <p>Oh no! There are no recipes created yet!</p>
          <p>Click "Add Recipe" and be the first one!</p>
        </div>
      ) : (
        getRecipeReducer.map((recipe) => (
          <div key={recipe.id}>
            <RecipeItem recipe={recipe} />
          </div>
        ))
      )}
    </div>
  );
}

export default RecipeList;
