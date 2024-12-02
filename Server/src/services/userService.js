const User = require("../models/userModel");

// Tạo người dùng mới
exports.createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// Tìm người dùng theo email
exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// Tìm người dùng theo token
exports.findUserByToken = async (verificationToken) => {
  return await User.findOne({ verificationToken });
};

// Tìm người dùng theo ID
exports.findUserById = async (id) => {
  return await User.findById(id);
};
