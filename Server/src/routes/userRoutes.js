const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControl");
const {
  authenticateToken,
  verifyRole,
} = require("../middleware/authValidation");

// Đăng ký
router.post("/register", userController.registerUser);

// Đăng nhập
router.post("/login", userController.loginUser);

// Làm mới Access Token
router.post("/token", userController.refreshToken);

router.get("/verify/:token", userController.verifyUser);


// Đăng xuất
router.post("/logout", userController.logoutUser);

// API bảo vệ chỉ cho admin
router.get("/admin", authenticateToken, verifyRole(["admin"]), (req, res) => {
  res.json({ message: "Chào mừng admin" });
});

module.exports = router;
