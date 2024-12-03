import React from "react";
import Box from "@mui/system/Box";
import { useState } from "react";
import { useCallback } from "react";
import axios from "axios";
import { useEffect } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Routes, Route, useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  getFilmById,
  getUpcomingFilm,
} from "../../../../redux/actions/filmActions";
import { useDispatch, useSelector } from "react-redux";

function Film_detail() {
  const dispatch = useDispatch();
  const selectedFilm = useSelector((state) => state.films.selectedFilm);
  const upcomingFilms = useSelector((state) => state.films.upcomingFilms);
  const loading = useSelector((state) => state.films.loading);

  const [urlTrailer, setUrlTrailer] = useState("");
  const [trailerTitle, setTrailerTitle] = useState("");
  const [trailerState, setTrailerState] = useState(false);

  let { id } = useParams();
  const openTrailer = (url, title) => {
    setTrailerTitle(title);
    setUrlTrailer(url);
    setTrailerState(true);
  };
  console.log("id", id);
  const closeTrailer = () => {
    setUrlTrailer("");
    setTrailerState(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getFilmById(id));
    dispatch(getUpcomingFilm());
  }, [dispatch, id]);

  useEffect(() => {
    console.log("Redux listFilm:", selectedFilm); // Xem danh sách phim từ Redux
    console.log("Redux upcomingFilms:", upcomingFilms); // Xem danh sách phim từ Redux
  }, [selectedFilm, upcomingFilms]);

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
          height: "50%",
          margin: "auto",
        }}
        className="banner-container"
      >
        {/* //Ảnh banner */}
        <Box
          className="banner"
          sx={{
            position: "relative",
            width: "auto",
            height: "28rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <img
            src={`http://localhost:5000/images/${selectedFilm?.imageBanner}`}
            style={{
              width: "88%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.7,
            }}
          />
          <Box sx={{ position: "absolute" }}>
            <Box
              component="img"
              onClick={() =>
                openTrailer(selectedFilm?.trailerUrl, selectedFilm?.title)
              }
              alt="play"
              width="70px"
              height="64px"
              src="https://www.galaxycine.vn/_next/static/media/button-play.2f9c0030.png"
              style={{ color: "transparent" }}
              sx={{
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                  cursor: "pointer",
                  opacity: 0.8,
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* //Danh sách phim */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ padding: "0 10%" }}
          className="film-detail"
        >
          {/* //Cột bên trái */}
          <Grid item xs={8} sx={{ paddingRight: "16px" }}>
            <Grid container sx={{ display: "flex" }}>
              <Grid item xs={5} sx={{ position: "relative" }}>
                <Box
                  component="img"
                  src={`http://localhost:5000/images/${selectedFilm?.image}`}
                  alt={selectedFilm?.title}
                  sx={{
                    width: "80%",
                    height: "auto",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0.5, 0, 0, 0.5)",
                    top: "-20%",
                    position: "absolute",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.02)",
                      cursor: "pointer",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={7} sx={{ marginTop: "7.5rem" }}>
                <Typography sx={{ fontWeight: "700", fontSize: "2rem" }}>
                  {selectedFilm?.title}
                </Typography>
                <Typography sx={{ fontWeight: "700" }}>
                  Đánh giá: {selectedFilm?.rateStart}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: "12rem" }}>
              <Box sx={{ display: "flex", padding: "50px 0 20px 0" }}>
                <Typography
                  sx={{
                    borderStyle: "solid",
                    borderLeftWidth: "3px",
                    borderColor: "#034EA0",
                    marginRight: "5px",
                  }}
                ></Typography>
                <Typography sx={{ fontWeight: "700" }}>
                  Nội Dung Phim
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: "300",
                  opacity: "0.9",
                  whiteSpace: "pre-wrap",
                  textAlign: "justify",
                }}
              >
                {selectedFilm?.description}
              </Typography>
            </Grid>
          </Grid>

          {/* //Cột bên phải */}
          <Grid item xs={4}>
            <Grid item xs={12} sx={{ marginTop: "0rem" }}>
              <Box sx={{ display: "flex", padding: "20px 0 20px 0" }}>
                <Typography
                  sx={{
                    borderStyle: "solid",
                    borderLeftWidth: "3px",
                    borderColor: "#034EA0",
                    marginRight: "5px",
                  }}
                ></Typography>
                <Typography sx={{ fontWeight: "500", fontSize: "1.3rem" }}>
                  PHIM SẮP CHIẾU
                </Typography>
              </Box>

              <Box>
                {upcomingFilms.map((upcomingFilm) => (
                  <Box
                    sx={{
                      padding: "10px 0 30px 0",
                    }}
                    key={upcomingFilm._id}
                  >
                    <Box
                      component="img"
                      src={`http://localhost:5000/images/${upcomingFilm.imageBanner}`}
                      alt={upcomingFilm.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "5px",
                        marginRight: "10px",
                        boxShadow: "0 4px 8px rgba(0.5, 0, 0, 0.5)",
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "scale(1.05)",
                          cursor: "pointer",
                        },
                      }}
                    />

                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "0.9rem",
                          opacity: "0.9",
                          paddingTop: "10px",
                        }}
                      >
                        {upcomingFilm.title}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
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
    </Box>
  );
}

export default Film_detail;
