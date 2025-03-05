const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Người dùng đặt vé (nếu có hệ thống user) - tùy chọn
  showtimeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime' }, // Suất chiếu được đặt
  seats: [{ // Danh sách ghế đã chọn
    row: String, // Hàng ghế (ví dụ: A, B, C...)
    col: Number, // Số ghế (ví dụ: 1, 2, 3...)
    seatType: { type: String, enum: ['standard', 'vip', 'couple'], default: 'standard' } // Loại ghế đã chọn (lấy từ seatLayout)
  }],
  bookingDate: { type: Date, default: Date.now }, // Thời gian đặt vé (mặc định là thời điểm tạo)
  totalPrice: Number,
  paymentMethod: String, // Phương thức thanh toán (VNPAY, ...)
  paymentStatus: { // Trạng thái thanh toán
    type: String,
    enum: ['pending', 'success', 'failed','checked', 'cancelled'],
    default: 'pending'
  },
  customerEmail: { // Thêm field này
    type: String,
    required: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email không hợp lệ']
  },
  bookingCode: {
    type: String,
    unique: true,
    required: true
  }  // discountCode: String, // Mã giảm giá - Tùy chọn, có thể thêm sau
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;