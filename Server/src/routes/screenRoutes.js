const express = require("express");
const screenController = require("../controllers/screenController");
const { authenticateToken, verifyRole } = require("../middleware/authValidation"); // Import middleware

const router = express.Router();

// Route để tạo mới phòng chiếu (chỉ admin)
router.post("/screens", authenticateToken, verifyRole(['admin']), screenController.createScreen);

// Route để lấy danh sách tất cả phòng chiếu (public)
router.get("/screens", screenController.getScreens);

// Route để lấy thông tin phòng chiếu theo ID (public)
router.get("/screens/:id", screenController.getScreenById);

// Route để cập nhật thông tin phòng chiếu (chỉ admin)
router.put("/screens/:id", authenticateToken, verifyRole(['admin']), screenController.updateScreen);

// Route để xóa phòng chiếu (chỉ admin)
router.delete("/screens/:id", authenticateToken, verifyRole(['admin']), screenController.deleteScreen);

// Route để lấy danh sách phòng chiếu theo Cinema ID (public)
router.get("/cinemas/:cinemaId/screens", screenController.getScreensByCinemaId); // Nested route dưới /cinemas

module.exports = router;