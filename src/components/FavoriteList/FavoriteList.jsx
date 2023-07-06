import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./FavoriteList.css"
import FavoriteItem from "../FavoriteItem/FavoriteItem";

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

  return (
    <div> 
      <h3>My Favorite Recipes:</h3>
      {getFavoriteReducer.length === 0 ? (
        <p>Oh no! You don't have any favorite recipes!</p>
      ) : (
        getFavoriteReducer.map((recipe) => (
          <div key={recipe.id}>
            <FavoriteItem recipe = {recipe} />
          </div>
        ))
      )}
    </div>
  );
}

export default FavoriteList;
