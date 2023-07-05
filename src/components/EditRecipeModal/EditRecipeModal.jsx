import Modal from "react-modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

function EditRecipeModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [backstory, setBackstory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalEdit = (recipe) => {
    // Logic to update the recipe
    const updatedRecipe = {
      title,
      author,
      backstory,
      ingredients,
      instructions,
    };

    // Dispatch an action to update the state with the new recipe
    dispatch({ type: "UPDATE_RECIPE", payload: recipe });
    axios
      .put(`/api/recipes/${recipe.id}/edit`, updatedRecipe)
      .then((response) => {
        getRecipes();
        // Handle the successful response if needed
        console.log("Recipe updated:", response.data);
        // Perform any additional actions after the recipe is updated
      })
      .catch((error) => {
        // Handle errors if needed
        console.log("Error updating recipe:", error);
      });

    // Close the modal after adding the recipe
    setIsModalOpen(false);
    // Reset the form fields
    setTitle("");
    setAuthor("");
    setBackstory("");
    setIngredients("");
    setInstructions("");
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  // THIS GET REQUEST IS CALLED ONLY AFTER A NEW RECIPE IS ADDED TO THE DB TO UPDATE LIST:
  const getRecipes = () => {
    axios
      .get("/api/recipes")
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
      <button className="edit-btn" onClick={handleEdit}>
        EDIT
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Add Recipe Modal"
        ariaHideApp={false}
      >
        {/* Modal content */}
        <form onSubmit={handleModalEdit}>
          <button className="toggle-btn" onClick={toggleModal}>
            ×
          </button>
          <br />
          <label>
            Title:
            <input
              className="title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          <label>
            Author:
            <input
              className="author-input"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
          <br />
          <label>
            Backstory:
            <input
              className="backstory-input"
              value={backstory}
              onChange={(e) => setBackstory(e.target.value)}
            />
          </label>
          <br />
          <label>
            Ingredients:
            <input
              className="ingredients-input"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </label>
          <br />
          <label>
            Instructions:
            <input
              className="instructions-input"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </label>
          <br />
          <button className="view-btn" type="submit">
            UPDATE
          </button>
        </form>
      </Modal>
    </>
  );
}

export default EditRecipeModal;
