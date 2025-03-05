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
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import axios from "axios";

const Movies = () => {
  const API_URL = "http://192.162.13.101:5000";

  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({
    title: "",
    description: "",
    image: "",
    imageBanner: "",
    trailerUrl: "",
    rateStart: "",
    status: "",
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${API_URL}/movie/movie`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setMovies(response.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách phim:", err);
      }
    };
    fetchMovies();
  }, []);

  const handleOpen = (
    movie = {
      title: "",
      description: "",
      image: "",
      imageBanner: "",
      trailerUrl: "",
      rateStart: "",
      status: "",
    }
  ) => {
    setCurrentMovie(movie);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    try {
      if (currentMovie._id) {
        await axios.put(
          `http://localhost:3001/movie/movie/${currentMovie._id}`,
          currentMovie,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:3001/movie/movie/create_movie",
          currentMovie,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      }
      const response = await axios.get("http://localhost:3001/movie/movie", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setMovies(response.data);
      handleClose();
    } catch (err) {
      console.error("Lỗi khi lưu phim:", err);
    }
  };

  const handleDelete = async (movieId) => {
    try {
      await axios.delete(`http://localhost:3001/movie/movie/${movieId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setMovies(movies.filter((movie) => movie._id !== movieId));
    } catch (err) {
      console.error("Lỗi khi xóa phim:", err);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Quản lý phim
      </Typography>
      <Button variant="contained" onClick={() => handleOpen()}>
        Thêm phim
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ảnh phim</TableCell>
              <TableCell>Tên phim</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie._id}>
                <TableCell>
                  <img
                    srcSet={movie.image}
                    src={movie.image}
                    alt={movie.title}
                    loading="lazy"
                    width="100"
                    height="150"
                  />
                </TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.description}</TableCell>
                <TableCell>{movie.status}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(movie)}>Sửa</Button>
                  <Button onClick={() => handleDelete(movie._id)}>Xóa</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentMovie._id ? "Sửa phim" : "Thêm phim"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên phim"
            fullWidth
            value={currentMovie.title}
            onChange={(e) =>
              setCurrentMovie({ ...currentMovie, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Mô tả"
            fullWidth
            value={currentMovie.description}
            onChange={(e) =>
              setCurrentMovie({ ...currentMovie, description: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Hình ảnh"
            fullWidth
            value={currentMovie.image}
            onChange={(e) =>
              setCurrentMovie({ ...currentMovie, image: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Hình ảnh banner"
            fullWidth
            value={currentMovie.imageBanner}
            onChange={(e) =>
              setCurrentMovie({ ...currentMovie, imageBanner: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Trailer URL"
            fullWidth
            value={currentMovie.trailerUrl}
            onChange={(e) =>
              setCurrentMovie({ ...currentMovie, trailerUrl: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Đánh giá"
            fullWidth
            value={currentMovie.rateStart}
            onChange={(e) =>
              setCurrentMovie({ ...currentMovie, rateStart: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Trạng thái"
            fullWidth
            value={currentMovie.status}
            onChange={(e) =>
              setCurrentMovie({ ...currentMovie, status: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSave}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Movies;
