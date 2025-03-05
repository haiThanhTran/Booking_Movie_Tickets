const Booking = require("../models/bookingModel");

// Service để tạo mới đơn đặt vé
exports.createBooking = async (bookingData) => {
  const booking = new Booking(bookingData);
  return await booking.save();
};

// Service để lấy danh sách tất cả đơn đặt vé
exports.getBookings = async () => {
  return await Booking.find()
    .populate('userId', 'username email') // Lấy thông tin user (tùy chọn)
    .populate('showtimeId') // Populate showtimeId để lấy thông tin suất chiếu
    .populate({ // Nested populate để lấy thông tin phim và rạp phim thông qua showtime
        path: 'showtimeId',
        populate: [
            { path: 'movieId', select: 'title' }, // Lấy tên phim
            { path: 'screenId', populate: { path: 'cinemaId', select: 'name' } } // Lấy tên rạp phim
        ]
    });
};

// Service để lấy thông tin đơn đặt vé theo ID
exports.getBookingById = async (id) => {
  return await Booking.findById(id)
    .populate('userId', 'username email') // Tùy chọn
    .populate('showtimeId')
    .populate({
        path: 'showtimeId',
        populate: [
            { path: 'movieId', select: 'title' },
            { path: 'screenId', populate: { path: 'cinemaId', select: 'name' } }
        ]
    });
};

// Service để cập nhật thông tin đơn đặt vé
exports.updateBooking = async (id, bookingData) => {
  return await Booking.findByIdAndUpdate(id, bookingData, { new: true });
};

// Service để xóa đơn đặt vé
exports.deleteBooking = async (id) => {
  return await Booking.findByIdAndDelete(id);
};

// Service để lấy danh sách đơn đặt vé theo User ID
exports.getBookingsByUserId = async (userId) => {
  return await Booking.find({ userId: userId })
    .populate('userId', 'username email') // Tùy chọn
    .populate('showtimeId')
    .populate({
        path: 'showtimeId',
        populate: [
            { path: 'movieId', select: 'title' },
            { path: 'screenId', populate: { path: 'cinemaId', select: 'name' } }
        ]
    });
};

// Service để lấy danh sách đơn đặt vé theo Showtime ID
exports.getBookingsByShowtimeId = async (showtimeId) => {
  return await Booking.find({ showtimeId: showtimeId })
    .populate('userId', 'username email') // Tùy chọn
    .populate('showtimeId')
    .populate({
        path: 'showtimeId',
        populate: [
            { path: 'movieId', select: 'title' },
            { path: 'screenId', populate: { path: 'cinemaId', select: 'name' } }
        ]
    });
};