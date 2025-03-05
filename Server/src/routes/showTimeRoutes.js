const express = require("express");
const showtimeController = require("../controllers/showtimeController");
const { authenticateToken, verifyRole } = require("../middleware/authValidation"); // Import middleware

const router = express.Router();

// Route để tạo mới suất chiếu (chỉ admin)
router.post("/showtimes", authenticateToken, verifyRole(['admin']), showtimeController.createShowtime);

// Route để lấy danh sách tất cả suất chiếu (public)
router.get("/showtimes", showtimeController.getShowtimes);

// Route để lấy thông tin suất chiếu theo ID (public)
router.get("/showtimes/:id", showtimeController.getShowtimeById);

// Route để cập nhật thông tin suất chiếu (chỉ admin)
router.put("/showtimes/:id", authenticateToken, verifyRole(['admin']), showtimeController.updateShowtime);

// Route để xóa suất chiếu (chỉ admin)
router.delete("/showtimes/:id", authenticateToken, verifyRole(['admin']), showtimeController.deleteShowtime);

// Route để lấy danh sách suất chiếu theo Movie ID (public)
router.get("/movies/:movieId/showtimes", showtimeController.getShowtimesByMovieId); // Nested route dưới /movies

// Route để lấy danh sách suất chiếu theo Screen ID (public)
router.get("/screens/:screenId/showtimes", showtimeController.getShowtimesByScreenId); // Nested route dưới /screens

// Route để lấy danh sách suất chiếu theo Movie ID và Screen ID (public)
router.get("/movies/:movieId/screens/:screenId/showtimes", showtimeController.getShowtimesByMovieAndScreen); // Nested route phức tạp hơn

module.exports = router;