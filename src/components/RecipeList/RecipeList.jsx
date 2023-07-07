import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./RecipeList.css";
import RecipeItem from "../RecipeItem/RecipeItem";

function RecipeList() {
  const getRecipeReducer = useSelector((store) => store.getRecipeReducer);
  const detailsReducer = useSelector((store) => store.detailsReducer)
  const dispatch = useDispatch();

  const imdbID = detailsReducer.imdbID 
  
  useEffect(() => {
    // Fetch recipes when the component mounts
    getRecipes();
  }, [imdbID]);

  const getRecipes = () => {
    axios
      .get(`/api/recipes/${imdbID}`)
      .then((response) => {
        dispatch({
          type: "SET_RECIPES",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("Error fetching recipes:", error);
      });
  };


  return (
    <div>
      {getRecipeReducer.length === 0 ? (
        <div>
          <p>Oh no! There are no recipes created yet!</p>
          <p>Click "Add Recipe" and be the first one!</p>
        </div>
      ) : (
        getRecipeReducer.map((recipe) => (
          <div key={recipe.id}>
            <RecipeItem recipe={recipe} />
          </div>
        ))
      )}
    </div>
  );
}

export default RecipeList;
