import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";

function ViewRecipeModal() {
  const getRecipeReducer = useSelector(
    (store) => store.getRecipeReducer
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalFavorite = (e) => {
    e.preventDefault();
    // Logic to favorite the recipe
    const currentRecipe = {
      title,
      author,
      backstory,
      ingredients,
      instructions,
    };
    // Dispatch an action to update the state with the current recipe
    dispatch({
      type: "SET_RECIPES",
      payload: currentRecipe,
    });

    // Make a GET request to the backend
    axios
      .get("/api/recipes", currentRecipe)
      .then((response) => {
        // Handle the successful response if needed
        console.log("Recipe viewed:", response.data);
      })
      .catch((error) => {
        // Handle errors if needed
        console.log("Error viewing recipe:", error);
      });

    // Close the modal after viewing the recipe
    setIsModalOpen(false);
  };

  const handleView = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button onClick={handleView}>View</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Add Recipe Modal"
        ariaHideApp={false}
      >
        {/* Modal content */}
        <button onClick={toggleModal}>X</button>
        <br />
        <label>
          Title:
          <div></div>
        </label>
        <br />
        <label>
          Author:
          <div></div>
        </label>
        <br />
        <label>
          Backstory:
          <div></div>
        </label>
        <br />
        <label>
          Ingredients:
          <div></div>
        </label>
        <br />
        <label>
          <div></div>
        </label>
        <br />
        <button onClick={handleModalFavorite}>Favorite</button>
      </Modal>
    </>
  );
}

export default ViewRecipeModal;
