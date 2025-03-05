const Screen = require("../models/screenModel");

// Service để tạo mới phòng chiếu
exports.createScreen = async (screenData) => {
  const screen = new Screen(screenData);
  return await screen.save();
};

// Service để lấy danh sách tất cả phòng chiếu
exports.getScreens = async () => {
  return await Screen.find().populate('cinemaId', 'name address'); // populate để lấy thông tin rạp phim (tên, địa chỉ)
};

// Service để lấy thông tin phòng chiếu theo ID
exports.getScreenById = async (id) => {
  return await Screen.findById(id).populate('cinemaId', 'name address'); // populate tương tự
};

// Service để cập nhật thông tin phòng chiếu
exports.updateScreen = async (id, screenData) => {
  return await Screen.findByIdAndUpdate(id, screenData, { new: true });
};

// Service để xóa phòng chiếu
exports.deleteScreen = async (id) => {
  return await Screen.findByIdAndDelete(id);
};

// Service để lấy danh sách phòng chiếu theo Cinema ID
exports.getScreensByCinemaId = async (cinemaId) => {
  return await Screen.find({ cinemaId: cinemaId }).populate('cinemaId', 'name address'); // Tìm phòng chiếu có cinemaId tương ứng, populate tương tự
};