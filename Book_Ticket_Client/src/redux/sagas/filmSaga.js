import { call, put, takeLatest } from "redux-saga/effects";
import {
  getAllFilmSuccess,
  getAllFilmFail,
  getCurrentFilmSuccess,
  getCurrentFilmFail,
  getUpcomingFilmSuccess,
  getUpcomingFilmFail,
  getFilmByIdSuccess,
  getFilmByIdFail,
  createNewFilmSuccess,
  createNewFilmFail,
} from "../actions/filmActions";
import {
  getAllFilms,
  getCurrentFilm,
  getUpcomingFilm,
  getMovieById,
  createNewFilm,
} from "../../pages/services/FilmServices";

const CODE_SUCCESS = 200;

export function* getAllFilmSaga() {
  try {
    const response = yield call(getAllFilms);
    console.log("response", response); // Thêm để kiểm tra response
    yield put(getAllFilmSuccess(response));
  } catch (error) {
    yield put(getAllFilmFail(error.message));
  }
}

export function* getCurrentFilmSaga() {
  try {
    const response = yield call(getCurrentFilm);
    if (response?.code === CODE_SUCCESS) {
      yield put(getCurrentFilmSuccess(response.data));
    } else {
      yield put(getCurrentFilmFail("Không thể lấy phim hiện tại !"));
    }
  } catch (error) {
    yield put(getCurrentFilmFail(error.message));
  }
}

export function* getUpcomingFilmSaga() {
  try {
    const response = yield call(getUpcomingFilm);
    console.log("response o saga", response);

    yield put(getUpcomingFilmSuccess(response));
  } catch (error) {
    yield put(getUpcomingFilmFail(error.message));
  }
}

export function* getFilmByIdSaga(action) {
  try {
    const response = yield call(getMovieById, action.payload);
    console.log("response o saga", response);

    yield put(getFilmByIdSuccess(response));
  } catch (error) {
    yield put(getFilmByIdFail(error.message));
  }
}

export function* createNewFilmSaga(action) {
  try {
    const response = yield call(createNewFilm, action.payload);
    alert("Success")
    yield put(createNewFilmSuccess(response.data));
  } catch (error) {
    yield put(createNewFilmFail(error.message));
  }
}
