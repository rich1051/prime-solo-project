import Modal from "react-modal";
import { useState } from "react";

function AddRecipe() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalAdd = () => {
    // Logic to add the recipe goes here
    // For example, dispatch an action to update the state with the new recipe
    dispatch({
      type: "ADD_RECIPE",
      payload: {
        // Include necessary data for the new recipe
      },
    });

    // Close the modal after adding the recipe
    setIsModalOpen(false);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button onClick={handleAdd}>Add Recipe</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Add Recipe Modal"
      >
        {/* Modal content */}
        <form>
          <button onClick={toggleModal}>X</button>
          <br />
          <input placeholder="Recipe Name" />
          <br />
          <input placeholder="Author" />
          <br />
          <input placeholder="Backstory" />
          <br />
          <input placeholder="Ingredients" />
          <br />
          <input placeholder="Steps" />
          <br />
          <button>Submit</button>
        </form>
        {/* Form to add a new recipe */}
        {/* Input fields, submit button, etc. */}
        {/* Handle the form submission with handleModalAdd */}
      </Modal>
    </>
  );
}

export default AddRecipe;
