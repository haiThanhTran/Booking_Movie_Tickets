export const GET_ALL_FILM_REQUEST = 'GET_ALL_FILM_REQUEST';
export const GET_ALL_FILM_SUCCESS = 'GET_ALL_FILM_SUCCESS';
export const GET_ALL_FILM_FAILURE = 'GET_ALL_FILM_FAILURE';

export const GET_CURRENT_FILM_REQUEST = 'GET_CURRENT_FILM_REQUEST';
export const GET_CURRENT_FILM_SUCCESS = 'GET_CURRENT_FILM_SUCCESS';
export const GET_CURRENT_FILM_FAILURE = 'GET_CURRENT_FILM_FAILURE';

export const GET_UPCOMING_FILM_REQUEST = 'GET_UPCOMING_FILM_REQUEST';
export const GET_UPCOMING_FILM_SUCCESS = 'GET_UPCOMING_FILM_SUCCESS';
export const GET_UPCOMING_FILM_FAILURE = 'GET_UPCOMING_FILM_FAILURE';

export const GET_FILM_BY_ID_REQUEST = 'GET_FILM_BY_ID_REQUEST';
export const GET_FILM_BY_ID_SUCCESS = 'GET_FILM_BY_ID_SUCCESS';
export const GET_FILM_BY_ID_FAILURE = 'GET_FILM_BY_ID_FAILURE';

export const CREATE_NEW_FILM_REQUEST = 'CREATE_NEW_FILM_REQUEST';
export const CREATE_NEW_FILM_SUCCESS = 'CREATE_NEW_FILM_SUCCESS';
export const CREATE_NEW_FILM_FAILURE = 'CREATE_NEW_FILM_FAILURE';

export const getAllFilm = () => ({ type: GET_ALL_FILM_REQUEST });
export const getAllFilmSuccess = (data) => ({ type: GET_ALL_FILM_SUCCESS, payload: data });
export const getAllFilmFail = (error) => ({ type: GET_ALL_FILM_FAILURE, payload: error });

export const getCurrentFilm = () => ({ type: GET_CURRENT_FILM_REQUEST });
export const getCurrentFilmSuccess = (data) => ({ type: GET_CURRENT_FILM_SUCCESS, payload: data });
export const getCurrentFilmFail = (error) => ({ type: GET_CURRENT_FILM_FAILURE, payload: error });

export const getUpcomingFilm = () => ({ type: GET_UPCOMING_FILM_REQUEST });
export const getUpcomingFilmSuccess = (data) => ({ type: GET_UPCOMING_FILM_SUCCESS, payload: data });
export const getUpcomingFilmFail = (error) => ({ type: GET_UPCOMING_FILM_FAILURE, payload: error });

export const getFilmById = (id) => ({ type: GET_FILM_BY_ID_REQUEST, payload: id });
export const getFilmByIdSuccess = (data) => ({ type: GET_FILM_BY_ID_SUCCESS, payload: data });
export const getFilmByIdFail = (error) => ({ type: GET_FILM_BY_ID_FAILURE, payload: error });

export const createNewFilm = (formData) => ({ type: CREATE_NEW_FILM_REQUEST, payload: formData });
export const createNewFilmSuccess = (data) => ({ type: CREATE_NEW_FILM_SUCCESS, payload: data });
export const createNewFilmFail = (error) => ({ type: CREATE_NEW_FILM_FAILURE, payload: error });