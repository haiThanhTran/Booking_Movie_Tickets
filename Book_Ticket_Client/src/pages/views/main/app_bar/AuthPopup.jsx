import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuthPopup({ open, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false); // Chuyển đổi giữa đăng nhập và đăng ký
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true); // Bắt đầu loading
    try {
      const endpoint = isRegister ? "/register" : "/login";
      const response = await axios.post(
        `http://localhost:5000/user${endpoint}`,
        formData,
        { withCredentials: true }
      );

      if (isRegister && response) {
        const successMessage = response?.data?.message || "Đăng ký thành công!";
        toast.success(successMessage); // Hiển thị thông báo thành công qua toast
      } else {
        console.log("user", response.data);
        localStorage.setItem("user", JSON.stringify(response.data.userInfo));
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.accessToken)
        );
        onLoginSuccess(response.data);
      }
      setIsRegister(false); // Chuyển về trạng thái đăng nhập
      onClose();
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.error || "Đã xảy ra lỗi";
      toast.error(errorMessage); // Hiển thị lỗi qua toast
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <>
      <ToastContainer />
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{isRegister ? "Đăng ký" : "Đăng nhập"}</DialogTitle>
        <DialogContent>
          {isRegister && (
            <TextField
              label="Tên người dùng"
              name="username"
              fullWidth
              margin="normal"
              onChange={handleChange}
            />
          )}
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            label="Mật khẩu"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={loading} // Vô hiệu hóa khi loading
            sx={{ display: "flex", justifyContent: "center" }} // Căn giữa nội dung
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" /> // Điều chỉnh kích thước và màu sắc
            ) : isRegister ? (
              "Đăng ký"
            ) : (
              "Đăng nhập"
            )}
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Đã có tài khoản? Đăng nhập"
              : "Chưa có tài khoản? Đăng ký"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AuthPopup;
