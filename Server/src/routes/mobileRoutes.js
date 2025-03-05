const express = require("express");
const router = express.Router();
const mobileControl = require("../controllers/mobileControl");
const {
  authenticateToken,
  verifyRole,
} = require("../middleware/authValidation");

// Đăng ký
router.post("/register", mobileControl.registerUser);

// Đăng nhập
router.post("/login", mobileControl.loginUser);

// Làm mới Access Token
router.post("/token", mobileControl.refreshToken);

router.get("/verify/:token", mobileControl.verifyUser);


// Đăng xuất
router.post("/logout", mobileControl.logoutUser);

// API bảo vệ chỉ cho admin
router.get("/admin", authenticateToken, verifyRole(["admin"]), (req, res) => {
  res.json({ message: "Chào mừng admin" });
});

module.exports = router;
