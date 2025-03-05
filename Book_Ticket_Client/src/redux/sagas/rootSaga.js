import { all, takeLatest } from "redux-saga/effects";
import {
  GET_ALL_FILM_REQUEST,
  GET_CURRENT_FILM_REQUEST,
  GET_UPCOMING_FILM_REQUEST,
  GET_FILM_BY_ID_REQUEST,
  CREATE_NEW_FILM_REQUEST,
} from "../actions/filmActions";
import {
  getAllFilmSaga,
  getCurrentFilmSaga,
  getUpcomingFilmSaga,
  getFilmByIdSaga,
  createNewFilmSaga,
} from "./filmSaga";

export default function* rootSaga() {
  yield takeLatest(GET_ALL_FILM_REQUEST, getAllFilmSaga);
  yield takeLatest(GET_CURRENT_FILM_REQUEST, getCurrentFilmSaga);
  yield takeLatest(GET_UPCOMING_FILM_REQUEST, getUpcomingFilmSaga);
  yield takeLatest(GET_FILM_BY_ID_REQUEST, getFilmByIdSaga);
  yield takeLatest(CREATE_NEW_FILM_REQUEST, createNewFilmSaga);
}
