const movieService = require("../services/movieService");

exports.uploadImage = async (req, res) => {
  try {
    console.log(req.files);
    const imageFilmPath = req.files["imageFilm"][0].filename;
    const imageBannerPath = req.files["imageFilmBanner"][0].filename;
    const movieData = {
      ...req.body,
      image: imageFilmPath,
      imageBanner: imageBannerPath,
    };
    const newMovie = await movieService.createMovie(movieData);
    res.status(201).json({ newMovie, file: req.files });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMovies = async (req, res) => {
  try {
    const movies = await movieService.getMovies();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCurrentMovies = async (req, res) => {
  try {
    const movies = await movieService.getCurrentMovies();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUpcomingMovies = async (req, res) => {
  try {
    const movies = await movieService.getUpcomingMovies();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMoviesById = async (req, res) => {
  try {
    const id = req.params.id;
    const movies = await movieService.getMoviesById(id);
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
