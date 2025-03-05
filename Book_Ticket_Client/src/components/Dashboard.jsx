import React from "react";
import { Typography, Paper } from "@mui/material";

const Dashboard = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Chào mừng đến với Admin Dashboard</Typography>
      <Typography>Vui lòng chọn một mục từ menu để bắt đầu quản lý.</Typography>
    </Paper>
  );
};

export default Dashboard;
