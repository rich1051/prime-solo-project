import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import './ViewRecipeModal.css'

function ViewRecipeModal({ recipe }) {

  const user = useSelector((store) => store.user);
  console.log(user)

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
        await axios.post(`/api/recipes/${id}/unfavorite`, {userId: user.id});
        setIsFavorite(false);
        getFavorites();
      } else {
        // Add to favorites
        await axios.post(`/api/recipes/${id}/favorite`, {userId: user.id});
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
        className='modal'
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
