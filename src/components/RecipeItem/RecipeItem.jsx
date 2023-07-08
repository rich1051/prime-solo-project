import "./RecipeItem.css";
import ViewRecipeModal from "../ViewRecipeModal/ViewRecipeModal";
import { useDispatch, useSelector } from "react-redux";
import EditRecipeModal from "../EditRecipeModal/EditRecipeModal";
import axios from "axios";

function RecipeItem({ recipe, handleDelete, getRecipes }) {
  console.log("RECIPE IS:", recipe);
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

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
