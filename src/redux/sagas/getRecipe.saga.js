import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getRecipe() {
  try {
    const response = yield axios.get("/api/recipes");
    const recipes = response.data;
    yield put({ type: "SET_RECIPES", payload: recipes });
  } catch (error) {
    console.log("Error in getRecipe saga:", error);
  }
}

function* getRecipeSaga() {
  yield takeLatest("FETCH_RECIPES", getRecipe);
}

export default getRecipeSaga;
