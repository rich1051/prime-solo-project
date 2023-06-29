import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ViewRecipeModal from "../ViewRecipeModal/ViewRecipeModal";

function FavoriteList() {

    const dispatch = useDispatch();
    const getFavoriteReducer = useSelector((store) => store.getFavoriteReducer);


    useEffect(() => {
      // Fetch recipes when the component mounts
      getFavorites();
    }, []);
  
    // THIS GET REQUEST IS CALLED AT THE BEGINNING TO SHOW ALL EXISTING RECIPES IN THE DB:
    const getFavorites = () => {
      axios
        .get("/api/favorites")
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

    const handleRemove = async () => {
        try {
          // Update the favorite status in the database
          await axios.put(`/api/recipes/${id}/favorite`);
        } catch (error) {
          console.error("Error updating recipe favorite status:", error);
        }
      };
    
    return (
        <div>
        {getFavoriteReducer.map((recipe) => (
          <div key={recipe.id}>
            <h4>{recipe.title}</h4>
            <p>Author: {recipe.author}</p>
            <ViewRecipeModal recipe={recipe} />
            <button onClick={() => handleRemove(recipe)}>Remove</button>
          </div>
        ))}
      </div>
    )
};

export default FavoriteList