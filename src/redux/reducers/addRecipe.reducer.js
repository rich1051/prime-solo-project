const initialState = {
  recipes: [],
};

const addRecipeReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_RECIPE":
        return {
          ...state,
          recipes: [...state.recipes, action.payload],
        };
      default:
        return state;
    }
  };

export default addRecipeReducer;