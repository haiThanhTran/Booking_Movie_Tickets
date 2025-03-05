const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendBookingConfirmation = async (booking) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: booking.email, // Thêm email vào booking model
    subject: 'Xác nhận đặt vé thành công',
    html: `<h1>Đặt vé thành công!</h1>
          <p>Mã vé của bạn: <strong>${booking.bookingCode}</strong></p>
          <p>Vui lòng đến quầy check-in trước 30 phút và trình mã này</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Lỗi gửi email:', error);
  }
};