const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
const path = require("path");
const app = express();

//Connect to the database
connectDB();

//Middleware
app.use(
  cors({
    origin: "localhost:5173", // hoặc bất kỳ nguồn nào bạn muốn cho phép
  })
);
app.use(express.json()); // Xử lý các req sang JSON
// Cấu hình để phục vụ tĩnh các tệp từ thư mục `src/assets/images`
app.use(
  "/images",
  express.static(path.join(__dirname, "../src/assets/images"))
);

//Routes
app.use("/movie", movieRoutes);
app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is working!" });
});

module.exports = app;
