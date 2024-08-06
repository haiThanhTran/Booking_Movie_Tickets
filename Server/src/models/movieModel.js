const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageBanner: String,
  trailerUrl: String,
  image: String,
  rateStart: String,
  status: String
})

module.exports = mongoose.model('Movie', movieSchema);
