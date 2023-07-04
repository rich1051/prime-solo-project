import ViewRecipeModal from "../ViewRecipeModal/ViewRecipeModal";
import axios from "axios";
import "./FavoriteItem.css";
import { useSelector, useDispatch } from "react-redux";

function FavoriteItem({ recipe }) {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleRemove = async (recipeId) => {
    try {
      // Update the favorite status in the database
      await axios.post(`/api/recipes/${recipeId}/unfavorite`, {userId: user.id});
      getFavorites();
    } catch (error) {
      console.error("Error updating recipe favorite status:", error);
    }
  };

  const getFavorites = () => {
    axios
      .get(`/api/favorites/${user.id}`)
      .then((response) => {
        // Dispatch an action to update the state with the fetched recipes
        console.log("response is:", response);
        dispatch({
          type: "SET_FAVORITES",
          payload: response.data,
        });
        console.log("response.data is:", response.data);
      })
      .catch((error) => {
        console.log("Error fetching favorites:", error);
      });
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