const express = require("express");
const cinemaController = require("../controllers/cinemaController");
const { authenticateToken, verifyRole } = require("../middleware/authValidation"); // Import middleware xác thực (nếu cần)

const router = express.Router();

// Route để tạo mới rạp phim (chỉ admin mới được tạo)
router.post("/cinemas", authenticateToken, verifyRole(['admin']), cinemaController.createCinema);

// Route để lấy danh sách tất cả rạp phim (public)
router.get("/cinemas", cinemaController.getCinemas);

// Route để lấy thông tin rạp phim theo ID (public)
router.get("/cinemas/:id", cinemaController.getCinemaById);

// Route để cập nhật thông tin rạp phim (chỉ admin mới được cập nhật)
router.put("/cinemas/:id", authenticateToken, verifyRole(['admin']), cinemaController.updateCinema);

// Route để xóa rạp phim (chỉ admin mới được xóa)
router.delete("/cinemas/:id", authenticateToken, verifyRole(['admin']), cinemaController.deleteCinema);

module.exports = router;