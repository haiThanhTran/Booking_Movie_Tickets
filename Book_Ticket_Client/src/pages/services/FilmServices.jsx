import axios from "axios";
// import env from "../../config/Enviroment";
import axiosInstance from '../../config/axiosInstance'


const API_FILM = "http://localhost:5000/movie";

export const getAllFilms = async () => {
  try {
    const response = await axios.get(`${API_FILM}/movie`);
    return response?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCurrentFilm = async () => {
  try {
    const response = await axios.get(`${API_FILM}/movie/current`);
    return response?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUpcomingFilm = async () => {
  try {
    const response = await axios.get(`${API_FILM}/movie/upcomingMovies`);
    return response?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${API_FILM}/movie/${id}`);
    console.log("response o services", response);
    return response?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createNewFilm = async (formData) => {
  try {
    return await axiosInstance.post("/movie/movie/create_movie", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Định dạng dữ liệu
      },
    });
  } catch (error) {
    console.error("Lỗi khi tạo phim:", error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

