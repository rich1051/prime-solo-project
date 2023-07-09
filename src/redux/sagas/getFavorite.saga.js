import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getFavorite() {
  try {
    const response = yield axios.get("/api/favorites");
    const recipes = response.data;
    yield put({ type: "SET_FAVORITES", payload: recipes });
  } catch (error) {
    console.log("Error in getFavorite saga:", error);
  }
}

function* getFavoriteSaga() {
  yield takeLatest("FETCH_FAVORITES", getFavorite);
}

export default getFavoriteSaga;
