import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./RecipeList.css";
import RecipeItem from "../RecipeItem/RecipeItem";

function RecipeList() {
  const getRecipeReducer = useSelector((store) => store.getRecipeReducer);
  const recipes = getRecipeReducer;
  const detailsReducer = useSelector((store) => store.detailsReducer);
  const dispatch = useDispatch();

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
        dispatch({
          type: "SET_RECIPES",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("Error fetching recipes:", error);
      });
  };

  const handleDelete = async (recipe) => {
    await axios.delete(`/api/recipes/${recipe.id}`);
    getRecipes();
  };

  return (
    <div>
      {recipes.length === 0 ? (
        <div>
          <p>Oh no! There are no recipes created yet!</p>
          <p>Click "Add Recipe" and be the first one!</p>
        </div>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id}>
            <RecipeItem
              recipe={recipe}
              handleDelete={handleDelete}
              getRecipes={getRecipes}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default RecipeList;
