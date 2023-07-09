import Modal from "react-modal";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./AddRecipeModal.css";

function AddRecipeModal({ refetch }) {
  const user = useSelector((store) => store.user);
  const detailsReducer = useSelector((store) => store.detailsReducer);
  const imdbID = detailsReducer.imdbID;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [backstory, setBackstory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  // this is for presentation purposes only:
  const handleKeydown = useCallback((event) => {
    console.log("key hit!");
    if (event.keyCode === 192) {
      setTitle("Hermione Granger's Pumpkin Pasties");
      setBackstory(
        "In the magical world of Harry Potter, Pumpkin Pasties are a delectable treat enjoyed by Hogwarts students aboard the Hogwarts Express. Inspired by Hermione Granger's love for knowledge and her exceptional baking skills, this recipe brings the enchanting taste of Pumpkin Pasties into your own kitchen. Embark on a culinary adventure with Hermione Granger's Pumpkin Pasties and experience the flavors of the Wizarding World."
      );
      setIngredients(
        "For the Pastry Dough: 2 cups of all-purpose flour, 1/2 teaspoon of salt, 1/2 cup of unsalted butter, cold and cut into small cubes, 1/4 cup of cold water. For the Pumpkin Filling: 1 cup of pumpkin puree (canned or homemade), 1/4 cup of granulated sugar, 1/2 teaspoon of ground cinnamon, 1/4 teaspoon of ground nutmeg, 1/4 teaspoon of ground cloves, 1/4 teaspoon of ground ginger, 1/4 teaspoon of vanilla extract. For the Glaze: 1/2 cup of powdered sugar, 1 tablespoon of milk, 1/4 teaspoon of vanilla extract"
      );
      setInstructions(
        "Preheat your oven to 375°F (190°C) and line a baking sheet with parchment paper. In a large mixing bowl, whisk together the flour and salt. Add the cold cubed butter and use a pastry cutter or your fingers to cut the butter into the flour until the mixture resembles coarse crumbs. Gradually add the cold water, a tablespoon at a time, mixing with a fork until the dough comes together. Be careful not to overmix. If needed, add more water, but only a little at a time. Transfer the dough to a lightly floured surface and gently knead it a few times until it forms a smooth ball. Wrap the dough in plastic wrap and refrigerate for 30 minutes. While the dough is chilling, prepare the pumpkin filling. In a mixing bowl, combine the pumpkin puree, granulated sugar, ground cinnamon, ground nutmeg, ground cloves, ground ginger, and vanilla extract. Mix well until all the ingredients are thoroughly combined. On a floured surface, roll out the chilled dough to a thickness of about 1/8 inch. Use a round cookie cutter or a glass to cut out circles with a diameter of approximately 4-5 inches. Place a spoonful of the pumpkin filling onto one half of each dough circle, leaving a small border around the edges. Fold the dough over the filling to create a half-moon shape. Press the edges together firmly and use a fork to crimp and seal the edges. Place the assembled pasties on the prepared baking sheet. Using a sharp knife, make a few small slits on the top of each pasty to allow steam to escape while baking. Bake the Pumpkin Pasties in the preheated oven for about 20-25 minutes or until they are golden brown. While the pasties are cooling, prepare the glaze. In a small bowl, whisk together the powdered sugar, milk, and vanilla extract until smooth and well combined. Once the pasties have cooled slightly, drizzle the glaze over the top of each pasty. Allow the glaze to set before serving. Pumpkin Pasties can be enjoyed warm or at room temperature. Enjoy the magical flavors of Hermione Granger's Pumpkin Pasties, and let your taste buds be transported to the wizarding world of Harry Potter. Note: These pasties can be stored in an airtight container for up to 3 days. Now, relish in the delight of Hermione Granger's Pumpkin Pasties, perfect for a magical snack or a Harry Potter-themed gathering. Embrace the spirit of adventure and enchantment as you savor the delicious combination of flaky pastry and spiced pumpkin filling."
      );
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);
  // end presentation stuff

  const author = user.username;

  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalAdd = (e) => {
    e.preventDefault();
    // Logic to add the recipe
    const newRecipe = {
      title,
      author,
      backstory,
      ingredients,
      instructions,
      imdbID,
    };
    // Dispatch an action to update the state with the new recipe
    dispatch({
      type: "ADD_RECIPE",
      payload: newRecipe,
    });

    // Make a POST request to the backend
    axios
      .post("/api/recipes", newRecipe)
      .then((response) => {
        // Handle the successful response if needed
        console.log("Recipe added:", response.data);
        getRecipes();
      })
      .catch((error) => {
        // Handle errors if needed
        console.log("Error adding recipe:", error);
      });

    // Close the modal after adding the recipe
    setIsModalOpen(false);
    // Reset the form fields
    setTitle("");
    setBackstory("");
    setIngredients("");
    setInstructions("");
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  // THIS GET REQUEST IS CALLED ONLY AFTER A NEW RECIPE IS ADDED TO THE DB TO UPDATE LIST:
  const getRecipes = () => {
    axios
      .get(`/api/recipes/movie/${imdbID}`)
      .then((response) => {
        // Dispatch an action to update the state with the fetched recipes
        dispatch({
          type: "SET_RECIPES",
          payload: response.data,
        });
        console.log("Fetched recipes:", response.data);
      })
      .catch((error) => {
        console.log("Error fetching recipes:", error);
      });
  };

  return (
    <>
      <button className="add-btn" onClick={handleAdd}>
        Add Recipe
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Add Recipe Modal"
        ariaHideApp={false}
      >
        {/* Modal content */}
        <form className="add-recipe-form" onSubmit={handleModalAdd}>
          <button className="toggle-btn" onClick={toggleModal}>
            ×
          </button>
          <br />
          <label>Title:</label>
          <input
            className="title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label>Author:</label>
          <p className="author-input">{author}</p>
          <br />
          <label>Backstory:</label>
          <input
            className="backstory-input"
            value={backstory}
            onChange={(e) => setBackstory(e.target.value)}
          />
          <br />
          <label>Ingredients:</label>
          <input
            className="ingredients-input"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <br />
          <label>Instructions:</label>
          <input
            className="instructions-input"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          <br />
          <button className="add-btn" type="submit">
            Add Recipe
          </button>
        </form>
      </Modal>
    </>
  );
}

export default AddRecipeModal;
