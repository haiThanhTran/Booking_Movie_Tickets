const cinemaService = require("../services/cinemaService");

// Controller để tạo mới rạp phim
exports.createCinema = async (req, res) => {
  try {
    const cinemaData = req.body; // Dữ liệu rạp phim từ body request
    const newCinema = await cinemaService.createCinema(cinemaData);
    res.status(201).json(newCinema); // Trả về rạp phim mới tạo với status 201 (Created)
  } catch (error) {
    res.status(500).json({ message: error.message }); // Lỗi server
  }
};

// Controller để lấy danh sách tất cả rạp phim
exports.getCinemas = async (req, res) => {
  try {
    const cinemas = await cinemaService.getCinemas();
    res.status(200).json(cinemas); // Trả về danh sách rạp phim với status 200 (OK)
  } catch (error) {
    res.status(500).json({ message: error.message }); // Lỗi server
  }
};

// Controller để lấy thông tin rạp phim theo ID
exports.getCinemaById = async (req, res) => {
  try {
    const id = req.params.id; // Lấy ID rạp phim từ params URL
    const cinema = await cinemaService.getCinemaById(id);
    if (!cinema) {
      return res.status(404).json({ message: "Rạp phim không tồn tại" }); // 404 Not Found nếu không tìm thấy
    }
    res.status(200).json(cinema); // Trả về thông tin rạp phim
  } catch (error) {
    res.status(500).json({ message: error.message }); // Lỗi server
  }
};

// Controller để cập nhật thông tin rạp phim
exports.updateCinema = async (req, res) => {
  try {
    const id = req.params.id;
    const cinemaData = req.body; // Dữ liệu cập nhật từ body request
    const updatedCinema = await cinemaService.updateCinema(id, cinemaData);
    if (!updatedCinema) {
      return res.status(404).json({ message: "Rạp phim không tồn tại" }); // 404 Not Found nếu không tìm thấy
    }
    res.status(200).json(updatedCinema); // Trả về rạp phim đã cập nhật
  } catch (error) {
    res.status(500).json({ message: error.message }); // Lỗi server
  }
};

// Controller để xóa rạp phim
exports.deleteCinema = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCinema = await cinemaService.deleteCinema(id);
    if (!deletedCinema) {
      return res.status(404).json({ message: "Rạp phim không tồn tại" }); // 404 Not Found nếu không tìm thấy
    }
    res.status(200).json({ message: "Rạp phim đã được xóa thành công" }); // Thông báo xóa thành công
  } catch (error) {
    res.status(500).json({ message: error.message }); // Lỗi server
  }
};