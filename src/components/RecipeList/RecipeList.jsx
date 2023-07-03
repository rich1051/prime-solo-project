import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ViewRecipeModal from "../ViewRecipeModal/ViewRecipeModal";
import "./RecipeList.css";

function RecipeList() {
  const getRecipeReducer = useSelector((store) => store.getRecipeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch recipes when the component mounts
    getRecipes();
  }, []);

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

  const handleDelete = (recipe) => {
    dispatch({ type: "DELETE_RECIPE", payload: recipe });
  };

  return (
    <div className="recipe-item">
      {getRecipeReducer.length === 0 ? (
        <div>
          <p>Oh no! There are no recipes created yet!</p>
          <p>Click "Add Recipe" and be the first one!</p>
        </div>
      ) : (
        getRecipeReducer.map((recipe) => (
          <div key={recipe.id}>
            <h4>{recipe.title}</h4>
            <p>Author: {recipe.author}</p>
            <ViewRecipeModal recipe={recipe} />
            <button
              className="delete-btn"
              onClick={() => handleDelete(recipe)}
            >
              DELETE
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default RecipeList;

