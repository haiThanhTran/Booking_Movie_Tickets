const screenService = require("../services/screenService");

// Controller để tạo mới phòng chiếu
exports.createScreen = async (req, res) => {
  try {
    const screenData = req.body;
    const newScreen = await screenService.createScreen(screenData);
    res.status(201).json(newScreen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để lấy danh sách tất cả phòng chiếu
exports.getScreens = async (req, res) => {
  try {
    const screens = await screenService.getScreens();
    res.status(200).json(screens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để lấy thông tin phòng chiếu theo ID
exports.getScreenById = async (req, res) => {
  try {
    const id = req.params.id;
    const screen = await screenService.getScreenById(id);
    if (!screen) {
      return res.status(404).json({ message: "Phòng chiếu không tồn tại" });
    }
    res.status(200).json(screen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để cập nhật thông tin phòng chiếu
exports.updateScreen = async (req, res) => {
  try {
    const id = req.params.id;
    const screenData = req.body;
    const updatedScreen = await screenService.updateScreen(id, screenData);
    if (!updatedScreen) {
      return res.status(404).json({ message: "Phòng chiếu không tồn tại" });
    }
    res.status(200).json(updatedScreen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để xóa phòng chiếu
exports.deleteScreen = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedScreen = await screenService.deleteScreen(id);
    if (!deletedScreen) {
      return res.status(404).json({ message: "Phòng chiếu không tồn tại" });
    }
    res.status(200).json({ message: "Phòng chiếu đã được xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để lấy danh sách phòng chiếu theo Cinema ID
exports.getScreensByCinemaId = async (req, res) => {
  try {
    const cinemaId = req.params.cinemaId;
    const screens = await screenService.getScreensByCinemaId(cinemaId);
    res.status(200).json(screens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};