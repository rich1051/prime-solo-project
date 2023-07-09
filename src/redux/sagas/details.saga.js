import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchDetails(action) {
  try {
    const details = yield axios.get(`/api/details/${action.payload}`);
    console.log("get details", details.data);
    yield put({ type: "SET_DETAILS", payload: details.data });
  } catch {
    console.log("Error in fetchDetails");
  }
}

function* detailsSaga() {
  yield takeLatest("FETCH_DETAILS", fetchDetails);
}

export default detailsSaga;
