import Modal from "react-modal";
import { useState } from "react";
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
