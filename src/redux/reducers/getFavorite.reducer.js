const getFavoriteReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_FAVORITES":
      return action.payload;
    default:
      return state;
  }
};

export default getFavoriteReducer;
