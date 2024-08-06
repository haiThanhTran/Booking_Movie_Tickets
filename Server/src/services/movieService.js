const Movie = require('../models/movieModel');

exports.getMovies = async () => {
  return await Movie.find();
};

exports.getCurrentMovies = async () => {
  return await Movie.find({ status: 'Đang chiếu' });
};

exports.getUpcomingMovies = async () => {
  return await Movie.find({ status: 'Sắp Chiếu' });
};

exports.createMovie = async (movieData) => {
  const movie = new Movie(movieData);
  return await movie.save();
};
