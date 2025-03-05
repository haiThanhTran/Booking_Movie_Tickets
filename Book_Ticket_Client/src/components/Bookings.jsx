import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  IconButton,
  Tooltip,
  alpha,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  CheckCircleOutline as CheckIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import axios from "axios";

// Styled Search Field
const SearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(3),
    backgroundColor: alpha(theme.palette.common.white, 0.9),
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    transition: "all 0.3s",
    "&:hover": {
      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    },
    "&.Mui-focused": {
      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
    },
  },
}));

const Bookings = () => {
  const API_URL = "http://192.162.13.101:5000";

  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${API_URL}/bookings/bookings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setBookings(response.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách booking:", err);
      }
    };
    fetchBookings();
  }, []);

  // Handle check-in action
  const handleCheckin = async (bookingId) => {
    try {
      await axios.put(
        `${API_URL}/bookings/bookings/${bookingId}`,
        { paymentStatus: "checked" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, paymentStatus: "checked" }
            : booking
        )
      );
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái booking:", err);
    }
  };

  // Filter bookings based on search term
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.paymentStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper sx={{ p: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Quản lý booking
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ display: "flex", mb: 2 }}>
        <SearchField
          size="small"
          placeholder="Tìm kiếm booking..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
            ),
          }}
          fullWidth
          sx={{ mr: 2, maxWidth: 300 }}
        />
        <Button
          startIcon={<FilterListIcon />}
          variant="outlined"
          sx={{
            borderRadius: 3,
            px: 2,
            borderWidth: 1.5,
          }}
        >
          Lọc
        </Button>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgba(0,0,0,0.02)" }}>
              <TableCell sx={{ fontWeight: 600 }}>Mã booking</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Trạng thái</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow
                key={booking._id}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: alpha("#3f51b5", 0.04),
                  },
                }}
              >
                <TableCell>{booking.bookingCode}</TableCell>
                <TableCell>{booking.paymentStatus}</TableCell>
                <TableCell align="right">
                  {booking.paymentStatus !== "checked" && (
                    <Tooltip title="Check-in">
                      <IconButton
                        size="small"
                        sx={{
                          color: "primary.main",
                          bgcolor: alpha("#3f51b5", 0.1),
                          "&:hover": {
                            bgcolor: alpha("#3f51b5", 0.2),
                          },
                        }}
                        onClick={() => handleCheckin(booking._id)}
                      >
                        <CheckIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Bookings;
