import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import searchSaga from './search.saga';
import detailsSaga from './details.saga';
import addRecipeSaga from './addRecipe.saga';
import getRecipeSaga from './getRecipe.saga';
import deleteSaga from './delete.saga';
import getFavoriteSaga from './getFavorite.saga';
import editRecipeSaga from './editRecipe.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    searchSaga(),
    detailsSaga(),
    addRecipeSaga(),
    getRecipeSaga(),
    deleteSaga(),
    getFavoriteSaga(),
    editRecipeSaga(),
  ]);
}
