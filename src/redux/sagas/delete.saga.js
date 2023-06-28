import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function*  deleteRecipe(action) {
    const recipe = action.payload;
    console.log(recipe);
    try{
        yield axios.delete(`/api/recipes/${action.payload.id}`, { data: { user_id: action.payload.user_id}});
        yield put({type:"FETCH_RECIPES"});
    } catch {
        console.log('error with delete request in deleteSaga');
    }
}

function*  deleteSaga() {
    yield takeLatest( 'DELETE_RECIPE', deleteRecipe)
}

export default deleteSaga;