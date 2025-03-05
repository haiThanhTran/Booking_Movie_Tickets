import * as filmActions from "../actions/filmActions";

const initialState = {
  films: [],
  currentFilms: [],
  upcomingFilms: [],
  selectedFilm: null,
  error: null,
  loading: true,
};

const filmReducer = (state = initialState, action) => {
  switch (action.type) {
    case filmActions.GET_ALL_FILM_SUCCESS:
      console.log("GET_ALL_FILM_SUCCESS called, payload:", action.payload);
      return {
        ...state,
        films: action.payload,
        error: null,
        loading: false,
      };

    case filmActions.GET_ALL_FILM_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case filmActions.GET_CURRENT_FILM_SUCCESS:
      return {
        ...state,
        currentFilms: action.payload,
        error: null,
        loading: false,
      };
    case filmActions.GET_CURRENT_FILM_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case filmActions.GET_UPCOMING_FILM_SUCCESS:
      return {
        ...state,
        upcomingFilms: action.payload,
        error: null,
        loading: false,
      };
    case filmActions.GET_UPCOMING_FILM_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case filmActions.GET_FILM_BY_ID_SUCCESS:
      return {
        ...state,
        selectedFilm: action.payload,
        error: null,
        loading: false,
      };
    case filmActions.GET_FILM_BY_ID_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case filmActions.CREATE_NEW_FILM_SUCCESS:
      return {
        ...state,
        films: [...state.films, action.payload],
        error: null,
        loading: false,
      };
    case filmActions.CREATE_NEW_FILM_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default filmReducer;
