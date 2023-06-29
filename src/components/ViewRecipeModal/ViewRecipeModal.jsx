import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import RecipeList from "../RecipeList/RecipeList";

function ViewRecipeModal({recipe}) {

  console.log('Recipe prop is:', recipe)
  const {title, author, backstory, ingredients, instructions } = recipe;

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
        <button onClick={handleModalFavorite}>Favorite</button>
      </Modal>
    </>
  );
}

export default ViewRecipeModal;
