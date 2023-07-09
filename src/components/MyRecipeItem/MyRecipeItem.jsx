import ViewRecipeModal from "../ViewRecipeModal/ViewRecipeModal";
import EditRecipeModal from "../EditRecipeModal/EditRecipeModal";

function MyRecipeItem({ recipe, handleDelete, onEdit }) {
  return (
    <div className="recipe-item">
      <h4>{recipe.title}</h4>
      <p>Author: {recipe.author}</p>
      <ViewRecipeModal recipe={recipe} />
      <button className="delete-btn" onClick={() => handleDelete(recipe)}>
        DELETE
      </button>
      <EditRecipeModal recipe={recipe} onEdit={onEdit} />
    </div>
  );
}

export default MyRecipeItem;
