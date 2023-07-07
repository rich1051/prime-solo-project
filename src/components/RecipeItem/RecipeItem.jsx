import "./RecipeItem.css";
import ViewRecipeModal from "../ViewRecipeModal/ViewRecipeModal";
import { useDispatch, useSelector } from "react-redux";
import EditRecipeModal from "../EditRecipeModal/EditRecipeModal";

function RecipeItem({ recipe }) {
  console.log("RECIPE IS:", recipe);
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const handleDelete = (recipe) => {
    dispatch({ type: "DELETE_RECIPE", payload: recipe });
  };

  const getRecipes = () => {
    axios
      .get("/api/recipes")
      .then((response) => {
        // Dispatch an action to update the state with the fetched recipes
        dispatch({
          type: "SET_RECIPES",
          payload: response.data,
        });
        console.log("Fetched recipes:", response.data);
      })
      .catch((error) => {
        console.log("Error fetching recipes:", error);
      });
  };

  return (
    <div className="recipe-item">
      <h4>{recipe.title}</h4>
      <p>Author: {recipe.author}</p>
      <ViewRecipeModal recipe={recipe} />
{/* conditionally render button only to user that made the recipe: */}
      {user.username === recipe.author && (
      <button className="delete-btn" onClick={() => handleDelete(recipe)}>
        DELETE
      </button>
      )}
      <EditRecipeModal recipe={recipe} onEdit = {getRecipes} />
    </div>
  );
}

export default RecipeItem;
