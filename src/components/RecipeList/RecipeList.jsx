import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ViewRecipeModal from "../ViewRecipeModal/ViewRecipeModal";

function RecipeList() {
  const getRecipeReducer = useSelector((store) => store.getRecipeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch recipes when the component mounts
    getRecipes();
  }, []);

  const getRecipes = () => {
    axios
      .get("/api/recipes")
      .then((response) => {
        // Dispatch an action to update the state with the fetched recipes
        console.log('response is:', response)
        dispatch({
          type: "SET_RECIPES",
          payload: response.data,
        });
        console.log('response.data is:', response.data)
      })
      .catch((error) => {
        console.log("Error fetching recipes:", error);
      });
  };

  const handleDelete = (recipe) => {
    dispatch({ type: "DELETE_RECIPE", payload: recipe });
  };

  return (
    <div>
      {getRecipeReducer.map((recipe) => (
        <div key={recipe.id}>
          <h4>{recipe.title}</h4>
          <p>Author: {recipe.author}</p>
          <ViewRecipeModal recipe={recipe}/>
          <button onClick={() => handleDelete(recipe)}>DELETE</button>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
