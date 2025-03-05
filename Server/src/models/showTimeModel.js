const mongoose = require("mongoose");

const showtimeSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }, // Phim của suất chiếu
  screenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen' }, // Phòng chiếu của suất chiếu
  startTime: Date, // Thời gian bắt đầu suất chiếu
  endTime: Date, // Thời gian kết thúc suất chiếu (tính toán dựa trên duration phim + thời gian nghỉ giữa phim)
  price: { // Giá vé, có thể phức tạp hơn nếu có nhiều loại vé (trẻ em, người lớn, VIP...)
    standard: Number,
    vip: Number,
    couple: Number
  },
  // bookedSeats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }] // Danh sách ghế đã được đặt - Quản lý trạng thái ghế trực tiếp trong seatLayout của Screen
});

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;