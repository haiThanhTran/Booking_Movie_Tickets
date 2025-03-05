const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const cinemaRoutes = require('./routes/cinemaRoutes');
const mobileRoutes = require("./routes/mobileRoutes");
const screenRoutes = require('./routes/screenRoutes');
const showtimeRoutes = require('./routes/showtimeRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");

//Connect to the database
connectDB();

//Middleware
const corsOptions = {
  origin: 'http://10.33.53.160:5000', // Địa chỉ IP của máy tính phát triển
  credentials: true,
};
app.use(cookieParser()); // Dùng middleware để parse cookie
app.use(cors()); // Áp dụng CORS với cấu hình trên
app.use(express.json()); // Xử lý các req sang JSON
// Cấu hình để phục vụ tĩnh các tệp từ thư mục `sc/assets/images`
app.use(
  "/images",
  express.static(path.join(__dirname, "../src/assets/images"))
);

//Routes
app.use("/movie", movieRoutes);

//User routes
app.use("/user", userRoutes);

//Mobile routes
app.use("/mobile", mobileRoutes);
app.use("/bookings", bookingRoutes);

app.use('/cinemas', cinemaRoutes); // Mount cinema routes vào path /cinemas, /cinemas/:id,...
app.use('/screens', screenRoutes); // Mount screen routes vào path /screens, /screens/:id,...
app.use('/showtime', showtimeRoutes); // Mount showtime routes sau cùng, cùng path prefix /api

app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is working!" });
});

module.exports = app;
