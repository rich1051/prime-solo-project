import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ViewRecipeModal from "../ViewRecipeModal/ViewRecipeModal";

function FavoriteList() {
  const dispatch = useDispatch();
  const getFavoriteReducer = useSelector((store) => store.getFavoriteReducer);
  const user = useSelector((store) => store.user);


  console.log("getFavoriteReducer is:", getFavoriteReducer);

  useEffect(() => {
    // Fetch recipes when the component mounts
    getFavorites();
  }, []);

  // THIS GET REQUEST IS CALLED AT THE BEGINNING TO SHOW ALL EXISTING RECIPES IN THE DB:
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
    <div>
      {getFavoriteReducer.length === 0 ? (
        <p>Oh no! You don't have any favorite recipes!</p>
      ) : (
        getFavoriteReducer.map((recipe) => (
          <div key={recipe.id}>
            <h4>{recipe.title}</h4>
            <p>Author: {recipe.author}</p>
            <ViewRecipeModal recipe={recipe} />
            <button onClick={() => handleRemove(recipe.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default FavoriteList;
