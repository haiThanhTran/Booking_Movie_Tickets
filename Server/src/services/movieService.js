const Movie = require("../models/movieModel");
import { ObjectId } from "mongodb";

exports.getMovies = async () => {
  return await Movie.find();
};

exports.getCurrentMovies = async () => {
  return await Movie.find({ status: "current" });
};

exports.getUpcomingMovies = async () => {
  return await Movie.find({ status: "upcoming" });
};

exports.getMoviesById = async (id) => {
  return await Movie.findById(id);
};

exports.createMovie = async (movieData) => {
  const movie = new Movie(movieData);
  return await movie.save();
};
