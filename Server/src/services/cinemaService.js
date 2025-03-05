const Cinema = require("../models/cinemaModel"); // Import model Cinema

// Service để tạo mới rạp phim
exports.createCinema = async (cinemaData) => {
  const cinema = new Cinema(cinemaData); // Tạo instance Cinema từ model và dữ liệu
  return await cinema.save(); // Lưu vào database và trả về rạp phim đã lưu
};

// Service để lấy danh sách tất cả rạp phim
exports.getCinemas = async () => {
  return await Cinema.find(); // Tìm tất cả document trong collection Cinema
};

// Service để lấy thông tin rạp phim theo ID
exports.getCinemaById = async (id) => {
  return await Cinema.findById(id); // Tìm document theo ID
};

// Service để cập nhật thông tin rạp phim
exports.updateCinema = async (id, cinemaData) => {
  return await Cinema.findByIdAndUpdate(id, cinemaData, { new: true }); // Tìm và cập nhật theo ID, { new: true } để trả về document đã cập nhật
};

// Service để xóa rạp phim
exports.deleteCinema = async (id) => {
  return await Cinema.findByIdAndDelete(id); // Tìm và xóa theo ID
};