import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

function* editRecipe(action) {
  try {
    const { payload } = action;
    const response = yield call(axios.put, `/api/recipes/${payload.id}`, payload);
    const updatedRecipe = response.data;

    // Dispatch a success action to update the recipe in the store
    yield put({ type: "UPDATE_RECIPE", payload: updatedRecipe });
  } catch (error) {
    console.log("Error in editRecipe saga");;
  }
}

function* editRecipeSaga() {
  yield takeLatest("EDIT_RECIPE", editRecipe);
}

export default editRecipeSaga;
