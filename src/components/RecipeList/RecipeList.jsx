import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function RecipeList() {
  const getRecipeReducer = useSelector((store) => store.getRecipeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch recipes when the component mounts
    getRecipes();
  }, []);

  const getRecipes = () => {
    axios
      .get('/api/recipes')
      .then((response) => {
        // Dispatch an action to update the state with the fetched recipes
        dispatch({
          type: "SET_RECIPES",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log('Error fetching recipes:', error);
      });
  };

  return (
    <div>
      {getRecipeReducer.map((recipe) => (
        <div key={recipe.id}>
          <h4>{recipe.title}</h4>
          <p>Author: {recipe.author}</p>
          {/* Display other recipe details as needed */}
        </div>
      ))}
    </div>
  );
}

export default RecipeList;