import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const API_URL= "http://192.162.13.101:5000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });
      const { userInfo, accessToken } = response.data;
      if (userInfo.role !== "admin") {
        setError("Chỉ admin mới có quyền truy cập");
        return;
      }
      localStorage.setItem("accessToken", accessToken);
      navigate("/dashboard");
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Đăng nhập Admin
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
