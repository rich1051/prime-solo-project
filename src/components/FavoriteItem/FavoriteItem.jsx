import ViewRecipeModal from "../ViewRecipeModal/ViewRecipeModal";
import axios from "axios";
import "./FavoriteItem.css"

function FavoriteItem({ recipe }) {
  console.log("RECIPE IS:", recipe);

  const handleRemove = async (recipeId) => {
    try {
      // Update the favorite status in the database
      await axios.delete(`/api/recipes/${recipeId}/unfavorite`);
      getFavorites();
    } catch (error) {
      console.error("Error updating recipe favorite status:", error);
    }
  };

  return (
    <div className="favorite-item">
      <h4>{recipe.title}</h4>
            <p>Author: {recipe.author}</p>
            <ViewRecipeModal recipe={recipe} />
            <button className="remove-btn" onClick={() => handleRemove(recipe.id)}>Remove</button>
    </div>
  );
}

export default FavoriteItem;