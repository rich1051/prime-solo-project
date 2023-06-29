import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

function ViewRecipeModal({ recipe }) {
  const { id, title, author, backstory, ingredients, instructions } = recipe;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFavorite = async (e) => {
    e.preventDefault();
    try {
      // Update the favorite status in the database
      await axios.put(`/api/recipes/${id}/favorite`);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating recipe favorite status:", error);
      // Handle error
    }
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
          <div>{title}</div>
        </label>
        <br />
        <label>
          Author:
          <div>{author}</div>
        </label>
        <br />
        <label>
          Backstory:
          <div>{backstory}</div>
        </label>
        <br />
        <label>
          Ingredients:
          <div>{ingredients}</div>
        </label>
        <br />
        <label>
          Instructions:
          <div>{instructions}</div>
        </label>
        <br />
        <button onClick={handleFavorite}>Favorite</button>
      </Modal>
    </>
  );
}

export default ViewRecipeModal;
