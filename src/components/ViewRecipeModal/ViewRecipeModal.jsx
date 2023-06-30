import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useDispatch } from "react-redux";

function ViewRecipeModal({ recipe }) {

  const dispatch = useDispatch();
  
  const { id, title, author, backstory, ingredients, instructions, favorite } = recipe;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorite);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFavorite = async (e) => {
    e.preventDefault();
    try {
      if (isFavorite) {
        // Remove from favorites
        await axios.put(`/api/recipes/${id}/unfavorite`);
        setIsFavorite(false);
        getFavorites();
      } else {
        // Add to favorites
        await axios.put(`/api/recipes/${id}/favorite`);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error updating recipe favorite status:", error);
      // Handle error
    }
  };

  const getFavorites = () => {
    axios
      .get("/api/favorites")
      .then((response) => {
        // Dispatch an action to update the state with the fetched recipes
        console.log("response is:", response);
        dispatch({
          type: "SET_FAVORITES",
          payload: response.data,
        });
        console.log("response.data is:", response.data);
      })
      .catch((error) => {
        console.log("Error fetching favorites:", error);
      });
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
        <button onClick={handleFavorite}>
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
      </Modal>
    </>
  );
}

export default ViewRecipeModal;
