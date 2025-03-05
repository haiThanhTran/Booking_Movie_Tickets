const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { error } = require("console");

// Tạo transporter để gửi email
const transporter = nodemailer.createTransport({
  service: "gmail", // Bạn có thể dùng dịch vụ email khác
  auth: {
    user: process.env.EMAIL_USER, // Địa chỉ email của bạn
    pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng email
  },
});

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Kiểm tra nếu email đã tồn tại
    const emailExist = await userService.findUserByEmail(email);
    if (emailExist) return res.status(400).json({ error: "Email đã tồn tại" });

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo mã xác minh (token)
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Tạo người dùng mới
    const userData = {
      username,
      email,
      password: hashedPassword,
      role: role || "customer",
      isVerified: false,
      verificationToken,
    };

    const savedUser = await userService.createUser(userData);

    const verificationLink = `${req.protocol}://${req.get(
      "host"
    )}/user/verify/${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Xác minh tài khoản",
      text: `Xin chào ${username}, vui lòng nhấp vào liên kết sau để xác minh tài khoản của bạn: ${verificationLink}`,
    };

    // Gửi email xác minh
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error); // Ghi lại thông tin lỗi
        return res
          .status(500)
          .json({ error: "Không thể gửi email xác minh, vui lòng thử lại." });
      }

      return res.json({
        message:
          "Đăng ký thành công, vui lòng kiểm tra email để xác minh tài khoản",
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Đăng nhập người dùng
exports.loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    // Tìm người dùng theo email
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({
          error: "Tài khoản hoặc Mật khẩu sai. Vui lòng đăng nhập lại.",
        });
    }

    // Kiểm tra tài khoản đã được xác minh chưa
    if (!user.isVerified) {
      return res.status(400).json({ error: "Tài khoản chưa được xác minh" });
    }

    // Kiểm tra mật khẩu
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .json({ error: "Mật khẩu sai. Vui lòng đăng nhập lại." });

    // Tạo Access Token và Refresh Token
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Lưu Refresh Token trong cookie HttpOnly
    res.json({ userInfo: user, accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { token } = req.params;

    // Tìm người dùng theo token xác minh
    const user = await userService.findUserByToken(token);
    if (!user) return res.status(400).json({ error: "Token không hợp lệ" });

    // Xác minh tài khoản
    user.isVerified = true;
    user.verificationToken = null; // Xóa token sau khi xác minh
    await user.save();

    res.json({
      message: "Tài khoản đã được xác minh thành công, bạn có thể đăng nhập",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Làm mới Access Token
exports.refreshToken = (req, res) => {
  console.log("request", req.cookies);
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401); // Không có Refresh Token

  // Xác minh Refresh Token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // Nếu lỗi là do Refresh Token hết hạn
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({
          message: "Refresh Token đã hết hạn. Vui lòng đăng nhập lại.",
        });
      }
      // Nếu lỗi khác (token không hợp lệ)
      return res.status(403).json({ message: "Refresh Token không hợp lệ" });
    }

    // Nếu Refresh Token hợp lệ, tạo ra Access Token mới
    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" } // Thời gian hiệu lực Access Token mới
    );

    res.json({ accessToken: newAccessToken });
  });
};

// Đăng xuất
exports.logoutUser = (req, res) => {
  res.json({ message: "Đã đăng xuất" });
};
