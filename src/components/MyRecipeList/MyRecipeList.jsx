import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import MyRecipeItem from "../MyRecipeItem/MyRecipeItem";

function MyRecipeList() {
  const user = useSelector((store) => store.user);
  const [myRecipes, setMyRecipes] = useState([]);
  const dispatch = useDispatch();
  

  useEffect(() => {
    // Fetch recipes when the component mounts
    getMyRecipes();
  }, []);

  // THIS GET REQUEST IS CALLED FOR PERSONAL RECIPES ONLY:
  const getMyRecipes = async () => {
    try {
      const response = await axios.get(`/api/recipes/personal/${user.username}`);
      console.log("response is:", response);
      setMyRecipes(response.data);
      console.log("response.data is:", response.data);
    } catch (error) {
      console.log("Error fetching personal recipes:", error);
    }
  };

  const handleDelete = async (recipe) => {
    await axios.delete(`/api/recipes/${recipe.id}`)
    getMyRecipes();
  };

  return (
    <div>
      <h3>My Created Recipes:</h3>
      {myRecipes.length === 0 ? (
        <p>Oh no! You haven't created any recipes!</p>
      ) : (
        myRecipes.map((recipe) => (
          <div key={recipe.id}>
            <MyRecipeItem recipe={recipe} handleDelete = {handleDelete} onEdit={getMyRecipes} />
          </div>
        ))
      )}
    </div>
  );
}

export default MyRecipeList;
