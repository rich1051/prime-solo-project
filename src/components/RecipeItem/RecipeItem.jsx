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
      <EditRecipeModal recipe={recipe} />
    </div>
  );
}

export default RecipeItem;
