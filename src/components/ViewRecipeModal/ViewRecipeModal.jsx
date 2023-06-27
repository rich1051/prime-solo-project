import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";

function ViewRecipeModal() {
  // Other code...

  const addRecipeReducer = useSelector(
    (store) => store.addRecipeReducer.recipes
  );

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // State variable to track the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State variable to store the currently selected recipe
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Function to handle the "View" button click and display the modal


  // Function to hide the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Add Recipe Modal"
        ariaHideApp={false}
      >
        <div className="modal-content">
          <h3>{selectedRecipe.title}</h3>
          <p>Author: {selectedRecipe.author}</p>
          <p>Backstory: {selectedRecipe.backstory}</p>
          <p>Ingredients: {selectedRecipe.ingredients}</p>
          <p>Instructions: {selectedRecipe.instructions}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </>
  );
}

export default ViewRecipeModal;
