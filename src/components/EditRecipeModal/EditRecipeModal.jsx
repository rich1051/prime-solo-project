import Modal from "react-modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function EditRecipeModal({ recipe, onEdit = () => {} }) {
  const user = useSelector((store) => store.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(recipe.title);
  const [author, setAuthor] = useState(recipe.author);
  const [backstory, setBackstory] = useState(recipe.backstory);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);

  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalEdit = () => {
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
        onEdit();
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

  // only allow username that matches author name exactly to edit the recipe:
  const handleClickEdit = () => {
    if (user.username === recipe.author) {
      setIsModalOpen(true);
    }
  };

  // THIS GET REQUEST IS CALLED ONLY AFTER A NEW RECIPE IS ADDED TO THE DB TO UPDATE LIST:
  // const getRecipes = () => {
  //   axios
  //     .get("/api/recipes")
  //     .then((response) => {
  //       // Dispatch an action to update the state with the fetched recipes
  //       dispatch({
  //         type: "SET_RECIPES",
  //         payload: response.data,
  //       });
  //       console.log("Fetched recipes:", response.data);
  //     })
  //     .catch((error) => {
  //       console.log("Error fetching recipes:", error);
  //     });
  // };

  return (
    <>
      {/* conditionally render button only to user that created recipe: */}
      {user.username === recipe.author && (
        <button className="edit-btn" onClick={handleClickEdit}>
          EDIT
        </button>
      )}

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
            <p className="author-input">{author}</p>
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
