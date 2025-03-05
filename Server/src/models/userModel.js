const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["customer", "admin", "sales"], // Các role khác nhau
    default: "customer", // Vai trò mặc định là 'customer'
  },
  verificationToken: { type: String, required: false }, // Thêm trường token xác minh
});


module.exports = mongoose.model("User", userSchema, "users");
