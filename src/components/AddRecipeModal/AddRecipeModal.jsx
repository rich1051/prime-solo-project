import Modal from "react-modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function AddRecipeModal() {

  const addRecipeReducer = useSelector((store) => store.addRecipeReducer.recipes);

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

  const handleModalAdd = (e) => {
    e.preventDefault();
    // Logic to add the recipe
    const newRecipe = {
      title,
      author,
      backstory,
      ingredients,
      instructions,
    };
    // Dispatch an action to update the state with the new recipe
    dispatch({
      type: "ADD_RECIPE",
      payload: newRecipe,
    });

  // Make a POST request to the backend
  axios
  .post('/api/recipes', newRecipe)
  .then((response) => {
    // Handle the successful response if needed
    console.log('Recipe added:', response.data);
  })
  .catch((error) => {
    // Handle errors if needed
    console.log('Error adding recipe:', error);
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

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleViewRecipe = () => {
    console.log("Modal work pls");
  }

  return (
    <>
      <button onClick={handleAdd}>Add Recipe</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Add Recipe Modal"
        ariaHideApp={false}
      >
        {/* Modal content */}
        <form onSubmit={handleModalAdd}>
          <button onClick={toggleModal}>X</button>
          <br />
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          <label>
            Author:
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
          <br />
          <label>
            Backstory:
            <textarea
              value={backstory}
              onChange={(e) => setBackstory(e.target.value)}
            />
          </label>
          <br />
          <label>
            Ingredients:
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </label>
          <br />
          <label>
            Instructions:
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Add Recipe</button>
        </form>
      </Modal>
      <div>
        {addRecipeReducer.map((recipe, i) => (
          <div key={i}>
            <h4>{recipe.title}</h4>
            <p>Author: {recipe.author}</p>
            <button onClick={handleViewRecipe}>View</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default AddRecipeModal;
