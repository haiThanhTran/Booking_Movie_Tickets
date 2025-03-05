const showtimeService = require("../services/showtimeService");

// Controller để tạo mới suất chiếu
exports.createShowtime = async (req, res) => {
  try {
    const showtimeData = req.body;
    const newShowtime = await showtimeService.createShowtime(showtimeData);
    res.status(201).json(newShowtime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để lấy danh sách tất cả suất chiếu
exports.getShowtimes = async (req, res) => {
  try {
    const showtimes = await showtimeService.getShowtimes();
    res.status(200).json(showtimes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để lấy thông tin suất chiếu theo ID
exports.getShowtimeById = async (req, res) => {
  try {
    const id = req.params.id;
    const showtime = await showtimeService.getShowtimeById(id);
    if (!showtime) {
      return res.status(404).json({ message: "Suất chiếu không tồn tại" });
    }
    res.status(200).json(showtime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để cập nhật thông tin suất chiếu
exports.updateShowtime = async (req, res) => {
  try {
    const id = req.params.id;
    const showtimeData = req.body;
    const updatedShowtime = await showtimeService.updateShowtime(id, showtimeData);
    if (!updatedShowtime) {
      return res.status(404).json({ message: "Suất chiếu không tồn tại" });
    }
    res.status(200).json(updatedShowtime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để xóa suất chiếu
exports.deleteShowtime = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedShowtime = await showtimeService.deleteShowtime(id);
    if (!deletedShowtime) {
      return res.status(404).json({ message: "Suất chiếu không tồn tại" });
    }
    res.status(200).json({ message: "Suất chiếu đã được xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để lấy danh sách suất chiếu theo Movie ID
exports.getShowtimesByMovieId = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    console.log("movieId:", movieId);
    const showtimes = await showtimeService.getShowtimesByMovieId(movieId);
    res.status(200).json(showtimes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để lấy danh sách suất chiếu theo Screen ID
exports.getShowtimesByScreenId = async (req, res) => {
  try {
    const screenId = req.params.screenId;
    clg("screenId:", screenId);
    const showtimes = await showtimeService.getShowtimesByScreenId(screenId);
    res.status(200).json(showtimes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để lấy danh sách suất chiếu theo Movie ID và Screen ID (ví dụ: lấy suất chiếu của phim X ở phòng Y)
exports.getShowtimesByMovieAndScreen = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const screenId = req.params.screenId;
    const showtimes = await showtimeService.getShowtimesByMovieAndScreen(movieId, screenId);
    res.status(200).json(showtimes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};