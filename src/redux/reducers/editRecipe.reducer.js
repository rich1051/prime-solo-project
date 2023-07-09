const editRecipeReducer = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_RECIPE":
      return action.payload;
    default:
      return state;
  }
};

export default editRecipeReducer;
