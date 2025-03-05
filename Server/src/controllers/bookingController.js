const mongoose = require("mongoose");
const bookingService = require("../services/bookingService");
const showtimeService = require("../services/showtimeService");
const screenService = require("../services/screenService");
const movieService = require("../services/movieService");
require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Bạn có thể dùng dịch vụ email khác
  auth: {
    user: process.env.EMAIL_USER, // Địa chỉ email của bạn
    pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng email
  },
});
const generateBookingCode = () => {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
};

const sendBookingConfirmation = async (booking) => {
  console.log("Sending confirmation to:", booking);
  const showtime = await showtimeService.getShowtimeById(booking.showtimeId);
  const screen = await screenService.getScreenById(showtime.screenId);
  const seats = booking.seats
    .map((seat) => `${seat.row}${seat.col}`)
    .join(", ");
  let title = "";
  if (showtime) {
    const movie = await movieService.getMoviesById(showtime.movieId);
    title = movie.title;
  }
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: booking.customerEmail,
    subject: "Xác nhận đặt vé xem phim",
    text:
      `Xin chào quý khách,\n\nCảm ơn bạn đã đặt vé xem phim!\n\nThông tin vé:\n` +
      `- Mã đặt vé: ${booking.bookingCode}\n` +
      `- Phim: ${title || "Tên phim"}\n` +
      `- Suất chiếu: ${new Date(showtime.startTime).toLocaleString()}\n` +
      `- Rạp: ${screen.name || "Tên rạp"}\n` +
      `- Ghế: ${seats}\n\n` +
      `Vui lòng giữ mã đặt vé để check-in. Chúc bạn xem phim vui vẻ!\n\n` +
      `Trân trọng,\nĐội ngũ hỗ trợ`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error);
      } else {
        console.log("Email sent:", info.response);
        resolve(info);
      }
    });
  });
};

exports.createBooking = async (req, res) => {
  console.log("Creating booking: ", req.body);
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bookingData = req.body;
    if (!bookingData.customerEmail) {
      throw new Error("Customer email is required");
    }

    const showtime = await showtimeService.getShowtimeById(bookingData.showtimeId, { session });
    const screen = await screenService.getScreenById(showtime.screenId, { session });

    const seatsToBook = bookingData.seats;
    const seatLayout = screen.seatLayout;

    for (const seat of seatsToBook) {
      const seatRow = seat.row.charCodeAt(0) - 'A'.charCodeAt(0);
      const seatCol = seat.col - 1;

      if (!seatLayout.seats[seatRow]) {
        await session.abortTransaction();
        return res.status(400).json({ message: `Hàng ${seat.row} không tồn tại` });
      }
      if (!seatLayout.seats[seatRow][seatCol]) {
        await session.abortTransaction();
        return res.status(400).json({ message: `Ghế ${seat.row}${seat.col} không tồn tại` });
      }
      if (seatLayout.seats[seatRow][seatCol].status !== 'available') {
        await session.abortTransaction();
        return res.status(400).json({ message: `Ghế ${seat.row}${seat.col} đã được đặt hoặc không khả dụng` });
      }

      seatLayout.seats[seatRow][seatCol].status = 'booked';
    }

    await screenService.updateScreen(screen._id, { seatLayout }, { session });

    const newBooking = await bookingService.createBooking({
      ...bookingData,
      bookingCode: generateBookingCode(),
      status: 'booked'
    }, { session });

    await session.commitTransaction();

    // Gửi email như một tác vụ độc lập, không ảnh hưởng đến giao dịch
    try {
      const emailInfo ={...newBooking, customerEmail: req.body.customerEmail};
      console.log("Sending email:", emailInfo._doc);
      await sendBookingConfirmation(emailInfo._doc);
    } catch (emailError) {
      console.error("Failed to send email:", emailError.message);
      // Không abort giao dịch, chỉ log lỗi và tiếp tục
    }

    res.status(201).json(newBooking);
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

// Các hàm khác giữ nguyên như trong mã gốc của bạn
exports.checkinBooking = async (req, res) => {
  try {
    const { bookingCode } = req.body;
    const booking = await bookingService.getBookingByCode(bookingCode);

    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy vé" });
    }

    if (booking.status === "checked") {
      return res.status(400).json({ message: "Vé đã được check-in trước đó" });
    }

    const updatedBooking = await bookingService.updateBooking(booking._id, {
      status: "checked",
    });

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await bookingService.getBookingById(id);
    if (!booking) {
      return res.status(404).json({ message: "Đơn đặt vé không tồn tại" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const bookingData = req.body;
    const updatedBooking = await bookingService.updateBooking(id, bookingData);
    if (!updatedBooking) {
      return res.status(404).json({ message: "Đơn đặt vé không tồn tại" });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBooking = await bookingService.deleteBooking(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Đơn đặt vé không tồn tại" });
    }
    res.status(200).json({ message: "Đơn đặt vé đã được xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookingsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await bookingService.getBookingsByUserId(userId);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookingsByShowtimeId = async (req, res) => {
  try {
    const showtimeId = req.params.showtimeId;
    const bookings = await bookingService.getBookingsByShowtimeId(showtimeId);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
