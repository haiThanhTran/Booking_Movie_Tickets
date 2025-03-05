const Showtime = require("../models/showtimeModel");

// Service để tạo mới suất chiếu
exports.createShowtime = async (showtimeData) => {
  const showtime = new Showtime(showtimeData);
  return await showtime.save();
};

// Service để lấy danh sách tất cả suất chiếu
exports.getShowtimes = async () => {
  return await Showtime.find()
    .populate('movieId', 'title image') // Lấy tên phim và ảnh phim
    .populate('screenId', 'name cinemaId') // Lấy tên phòng chiếu và cinemaId
    .populate({ // Populate lồng để lấy tên rạp phim
        path: 'screenId',
        populate: {
            path: 'cinemaId',
            select: 'name' // Chỉ lấy tên rạp
        }
    });
};

// Service để lấy thông tin suất chiếu theo ID
exports.getShowtimeById = async (id) => {
  return await Showtime.findById(id)
    .populate('movieId', 'title image')
    .populate('screenId', 'name cinemaId')
    .populate({
        path: 'screenId',
        populate: {
            path: 'cinemaId',
            select: 'name'
        }
    });
};

// Service để cập nhật thông tin suất chiếu
exports.updateShowtime = async (id, showtimeData) => {
  return await Showtime.findByIdAndUpdate(id, showtimeData, { new: true });
};

// Service để xóa suất chiếu
exports.deleteShowtime = async (id) => {
  return await Showtime.findByIdAndDelete(id);
};

// Service để lấy danh sách suất chiếu theo Movie ID
exports.getShowtimesByMovieId = async (movieId) => {
  return await Showtime.find({ movieId: movieId })
    .populate('movieId', 'title image')
    .populate('screenId', 'name cinemaId')
    .populate({
        path: 'screenId',
        populate: {
            path: 'cinemaId',
            select: 'name'
        }
    });
};

// Service để lấy danh sách suất chiếu theo Screen ID
exports.getShowtimesByScreenId = async (screenId) => {
  return await Showtime.find({ screenId: screenId })
    .populate('movieId', 'title image')
    .populate('screenId', 'name cinemaId')
    .populate({
        path: 'screenId',
        populate: {
            path: 'cinemaId',
            select: 'name'
        }
    });
};

// Service để lấy danh sách suất chiếu theo Movie ID và Screen ID
exports.getShowtimesByMovieAndScreen = async (movieId, screenId) => {
  return await Showtime.find({ movieId: movieId, screenId: screenId })
    .populate('movieId', 'title image')
    .populate('screenId', 'name cinemaId')
    .populate({
        path: 'screenId',
        populate: {
            path: 'cinemaId',
            select: 'name'
        }
    });
};