const movieListReducer = (state = [], action) => {
  console.log("action.payload before case type SET_MOVIE is:", action.payload);
  switch (action.type) {
    case "SET_MOVIE":
      console.log("action.payload BEFORE RETURNING:", action.payload.data);
      return action.payload.data;
    default:
      return state;
  }
};

export default movieListReducer;
