import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchMovie(action) {
  try {
    console.log("fetching movies with terms:", action.payload);
    const movieResponse = yield axios.get(`/api/search/${action.payload}`);
    console.log("AFTER SEARCH GET");

    yield put({ type: "SET_MOVIE", payload: movieResponse.data });
  } catch (error) {
    console.log("error fetching movies", error);
  }
}

function* searchSaga() {
  yield takeLatest("GET_MOVIE", fetchMovie);
}

export default searchSaga;
