const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token không tồn tại" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Access Token đã hết hạn" });
      }
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    req.user = user;
    next();
  });
};

// Phân quyền người dùng
exports.verifyRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({ message: "Bạn không có quyền truy cập" });
    }
    next();
  };
};
