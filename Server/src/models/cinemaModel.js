const mongoose = require("mongoose");

const cinemaSchema = new mongoose.Schema({
  name: String,
  address: String,
  location: { // Tọa độ địa lý nếu cần, để hiển thị trên bản đồ
    type: { type: String, enum: ['Point'] },
    coordinates: [Number] // [longitude, latitude] - [kinh độ, vĩ độ]
  },
  // screens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Screen' }] // Danh sách các phòng chiếu thuộc rạp - Tạm thời bỏ qua để đơn giản, sẽ thêm sau
});

const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;