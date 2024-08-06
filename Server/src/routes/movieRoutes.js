const express = require("express");
const movieController = require("../controllers/movieControl");
const multer = require("multer");
const { path } = require("../app");

// Cấu hình lưu trữ cho Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/assets/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/movie", movieController.getMovies);
router.get("/movie/current", movieController.getCurrentMovies);
router.get("/movie/upcomingmovies", movieController.getUpcomingMovies);
router.post(
  "/movie/create_movie",
  upload.fields([{name:'imageFilm'},{name:'imageFilmBanner'}]),//gán req.files vào tuyến đường này
  movieController.uploadImage
);

module.exports = router;
