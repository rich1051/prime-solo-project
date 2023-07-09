import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchRecipe(action) {
  try {
    const { title, author, backstory, ingredients, instructions } =
      action.payload;
    const data = {
      title,
      author,
      backstory,
      ingredients,
      instructions,
    };
    const recipe = yield axios.post(`/api/add`, data);
    console.log("post recipe", recipe.data);
    yield put({ type: "ADD_RECIPE", payload: recipe.data });
  } catch {
    console.log("Error in fetchRecipe");
  }
}

function* addRecipeSaga() {
  yield takeLatest("FETCH_RECIPE", fetchRecipe);
}

export default addRecipeSaga;
