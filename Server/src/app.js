const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path");
const app = express();

//Connect to the database
connectDB();

//Middleware
app.use(cors());
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


app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is working!" });
});

module.exports = app;
