const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema({
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' }, // Rạp phim chứa phòng chiếu này
  name: String, // Tên phòng chiếu (ví dụ: Phòng 1, Phòng VIP)
  seatLayout: { // Mô tả bố cục ghế ngồi (có thể là 2D array hoặc cấu trúc dữ liệu khác tùy độ phức tạp)
    rows: Number,
    cols: Number,
    seats: [[{ // Ví dụ 2D array biểu diễn ghế, có thể thêm thông tin về loại ghế, trạng thái
      type: { type: String, enum: ['standard', 'vip', 'couple'], default: 'standard' }, // Loại ghế (mặc định là standard)
      status: { type: String, enum: ['available', 'booked', 'unavailable'], default: 'available' }, // Trạng thái ghế (mặc định là available)
      seatNumber: String // Số ghế (ví dụ: A1, A2, B1...)
    }]]
  },
  // showtimes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Showtime' }] // Danh sách suất chiếu trong phòng - Tạm thời bỏ qua
});

const Screen = mongoose.model('Screen', screenSchema);

module.exports = Screen;