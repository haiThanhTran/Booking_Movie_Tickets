const express = require("express");
const bookingController = require("../controllers/bookingController");
const { authenticateToken, verifyRole } = require("../middleware/authValidation"); // Import middleware

const router = express.Router();

// Route để tạo mới đơn đặt vé (public - cần validate user login ở frontend nếu cần)
router.post("/bookings", bookingController.createBooking); // **Public endpoint**

// Route để lấy danh sách tất cả đơn đặt vé (admin only)
router.get("/bookings", authenticateToken, verifyRole(['admin']), bookingController.getBookings); // **Admin only**

// Route để lấy thông tin đơn đặt vé theo ID (admin only)
router.get("/bookings/:id", authenticateToken, verifyRole(['admin']), bookingController.getBookingById); // **Admin only**

// Route để cập nhật thông tin đơn đặt vé (admin only)
router.put("/bookings/:id", authenticateToken, verifyRole(['admin']), bookingController.updateBooking); // **Admin only**

// Route để xóa đơn đặt vé (admin only)
router.delete("/bookings/:id", authenticateToken, verifyRole(['admin']), bookingController.deleteBooking); // **Admin only**

// Route để lấy danh sách đơn đặt vé theo User ID (nếu có user system - public for user, admin for all users)
router.get("/users/:userId/bookings", authenticateToken, bookingController.getBookingsByUserId); // **Authenticated users can see their own, admin can see all**

// Route để lấy danh sách đơn đặt vé theo Showtime ID (admin only)
router.get("/showtimes/:showtimeId/bookings", authenticateToken, verifyRole(['admin']), bookingController.getBookingsByShowtimeId); // **Admin only**


module.exports = router;