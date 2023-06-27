const addRecipeReducer = (state = [], action) => {
    switch (action.type) {
      case "ADD_RECIPE":
        return {
          ...state,
          recipes: [...state, action.payload],
        };
      default:
        return state;
    }
  };

export default addRecipeReducer