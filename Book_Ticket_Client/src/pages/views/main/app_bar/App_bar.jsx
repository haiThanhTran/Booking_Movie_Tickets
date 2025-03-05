import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Box from "@mui/system/Box";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { CircularProgress } from "@mui/material";

import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllFilm } from "../../../../redux/actions/filmActions";
import AuthPopup from "./AuthPopup"; // Import component Popup Đăng ký/Đăng nhập
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function App_bar() {
  const dispatch = useDispatch();
  const films = useSelector((state) => state.films.films);
  const loading = useSelector((state) => state.films.loading);
  const [user, setUser] = useState(null); // Trạng thái chứa thông tin người dùng
  const [anchorEl, setAnchorEl] = useState(null); // Để quản lý menu khi bấm vào avatar

  // const [films, setFilms] = useState([]);
  // const fetchFilm = useCallback(async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/movie/movie");
  //     setFilms(response.data);
  //     console.log("film:", response.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, []);

  useEffect(() => {
    dispatch(getAllFilm());
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      console.log("user:", JSON.parse(loggedInUser));
      setUser(JSON.parse(loggedInUser)); // Lấy thông tin người dùng từ localStorage
    }
  }, [dispatch]);

  const handleLoginSuccess = (userData) => {
    setUser(userData); // Cập nhật thông tin người dùng vào state mà không cần reload
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [trailerState, setTrailerState] = useState(false);
  const [urlTrailer, setUrlTrailer] = useState("");
  const [trailerTitle, setTrailerTitle] = useState("");
  const [authPopupOpen, setAuthPopupOpen] = useState(false);

  const openComponentCreateFilm = () => {
    navigate("/upload-new-film");
  };
  const openDetailFilm = () => {
    navigate("/detail");
  };
  const openTrailer = (url, title) => {
    setTrailerTitle(title);
    setUrlTrailer(url);
    setTrailerState(true);
  };

  const closeTrailer = () => {
    setUrlTrailer("");
    setTrailerState(false);
  };

  const showSlide = useCallback((index) => {
    const slides = document.querySelectorAll(".slide");
    if (slides.length === 0) return;
    let newSlideIndex = index;

    //Đoạn này để set index về 0 nếu banner đến vị trí cuối cùng
    if (index >= slides.length) {
      newSlideIndex = 0;
    } else if (index < 0) {
      newSlideIndex = slides.length - 1;
    }
    //Nếu có thay đổi là gọi useState để set lại trạng thái banner
    setCurrentSlide(newSlideIndex);

    // Lấy giá trị px của width để tính toán
    const slideWidth = slides[newSlideIndex]?.clientWidth;
    document.querySelector(".slides").style.transform = `translateX(${
      -slideWidth * newSlideIndex
    }px)`;
  }, []);

  const nextSlide = useCallback(() => {
    showSlide(currentSlide + 1);
  }, [currentSlide, showSlide]);

  const prevSlide = useCallback(() => {
    showSlide(currentSlide - 1);
  }, [currentSlide, showSlide]);

  useEffect(() => {
    showSlide(currentSlide);
    const handleResize = () => showSlide(currentSlide);
    window.addEventListener("resize", handleResize);
    const autoSlide = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(autoSlide);
    };
  }, [currentSlide, showSlide, nextSlide]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          margin: "auto",
          overflow: "hidden",
        }}
        className="banner-container"
      >
        <Box
          className="banner"
          sx={{
            position: "relative",
            width: "100%",
            display: "flex",
          }}
        >
          <Box
            className="slides"
            sx={{
              display: "flex",
              transition: "transform 0.5s ease-in-out",
              width: "100%",
            }}
          >
            {films.map((film, index) => (
              <Box
                key={index}
                className="slide"
                sx={{ position: "relative", minWidth: "100%", height: "100%" }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "50px",
                    left: "30%",
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<OndemandVideoIcon />}
                      onClick={() => openTrailer(film.trailerUrl, film.title)}
                    >
                      Watch Trailer
                    </Button>
                  </Stack>
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    bottom: "50px",
                    right: "30%",
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ConfirmationNumberIcon />}
                    >
                      Đặt vé ngay
                    </Button>
                  </Stack>
                </Box>
                <img
                  src={`http://localhost:5000/images/${film.imageBanner}`}
                  alt={`Phim ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "429.562px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ))}
          </Box>
          <Box
            component="button"
            className="prev"
            onClick={prevSlide}
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              border: "none",
              cursor: "pointer",
              padding: "10px",
              zIndex: 10,
              left: 0,
            }}
          >
            &#10094;
          </Box>
          <Box
            component="button"
            className="next"
            onClick={nextSlide}
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              border: "none",
              cursor: "pointer",
              padding: "10px",
              zIndex: 10,
              right: 0,
            }}
          >
            &#10095;
          </Box>
        </Box>
        <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
          {user ? (
            <div>
              {/* Avatar người dùng sau khi đăng nhập */}
              <Avatar
                onClick={handleMenuOpen}
                sx={{ cursor: "pointer", backgroundColor: "orange" }}
              >
                {user?.username ? user?.username[0] : ""}{" "}
                {/* Hiển thị chữ cái đầu của tên người dùng hoặc để trống nếu không có */}
              </Avatar>

              {/* Menu chứa các tùy chọn khi click vào avatar */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Tài khoản</MenuItem>
                <MenuItem
                  onClick={() => {
                    // Đăng xuất
                    localStorage.removeItem("user");
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("token");
                    axios.post("http://localhost:5000/user/logout");
                    setUser(null);
                    handleMenuClose();
                  }}
                >
                  Đăng xuất
                </MenuItem>
              </Menu>
            </div>
          ) : (
            // Nút đăng nhập khi chưa đăng nhập
            <Button
              onClick={() => setAuthPopupOpen(true)}
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "#ff6347",
                color: "white",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                zIndex: 10,
                borderRadius: "5px",
                fontSize: "16px",
              }}
            >
              Đăng nhập
            </Button>
          )}
        </Box>
        <Box>
          <Button
            variant="contained"
            endIcon={<ControlPointIcon />}
            onClick={() => openComponentCreateFilm()}
            sx={{
              position: "absolute",
              top: "10px",
              right: "150px",
              border: "none",
              cursor: "pointer",
              zIndex: 10,
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
            Tạo Phim
          </Button>
        </Box>
        <Box>
          {/* <Button
            variant="contained"
            endIcon={<ControlPointIcon />}
            onClick={() => openDetailFilm()}
            sx={{
              position: "absolute",
              top: "10px",
              right: "300px",
              border: "none",
              cursor: "pointer",
              zIndex: 10,
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
            Detail-Film
          </Button> */}
        </Box>
      </Box>

      <Dialog open={trailerState} onClose={closeTrailer}>
        <DialogTitle>{trailerTitle}</DialogTitle>
        <DialogContent>
          <iframe
            width="560"
            height="315"
            src={urlTrailer}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>

      <AuthPopup
        onLoginSuccess={handleLoginSuccess}
        open={authPopupOpen}
        onClose={() => setAuthPopupOpen(false)}
      />
    </Box>
  );
}

export default App_bar;
