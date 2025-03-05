import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button, Box, Grid, CircularProgress } from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useNavigate } from "react-router-dom";
import "../list_board/List_board.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFilm
} from "../../../../redux/actions/filmActions";

function ListBoard() {
  const dispatch = useDispatch();
  const films = useSelector((state) => state.films.films);
  const loading = useSelector((state) => state.films.loading);


  const navigate = useNavigate();
  // const [films, setFilms] = useState([]);
  // const fetchFilm = useCallback(async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/movie/movie");
  //     setFilms(response.data);
  //     setLoading(false);
  //   } catch (err) {
  //     console.error(err);
  //     setLoading(false);
  //   }
  // }, []);

  const openDetailFilm = (id) => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    dispatch(getAllFilm())
  }, [dispatch]);

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
    <Box sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          margin: "40px 0 20px 0",
          width: "100%",
          position: "relative",
          left: "10%",
          fontSize: "30px",
          fontWeight: "bold",
          color: "#DA8F00",
        }}
      >
        | PHIM
      </Box>

      <Grid
        container
        spacing={2}
        sx={{
          padding: "0 140px 0 140px",
        }}
      >
        {films.map((film) => (
          <Grid item xs={3} md={3} key={film._id}>
            <Box
              sx={{ margin: 1, textAlign: "center", position: "relative" }}
              className="movie-item"
            >
              <Box sx={{ margin: "0px" }}>
                <Box
                  component="img"
                  src={`http://localhost:5000/images/${film.image}`}
                  alt={film.title}
                  sx={{
                    width: "100%",
                    borderRadius: "5px",
                    height: "100%",
                    transition: "all 0.7s ease",
                    "&:hover": {
                      cursor: "pointer",
                      filter: "brightness(50%)",
                    },
                  }}
                />
                <Box className="hover-overlay">
                  <Button
                    sx={{
                      border: "none",
                      cursor: "pointer",
                      zIndex: 10,
                      borderRadius: "5px",
                      fontSize: "10px",
                      fontWeight: "400",
                    }}
                    endIcon={<ConfirmationNumberIcon />}
                    onClick={() => openDetailFilm(film._id)}
                  >
                    Mua Vé
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ListBoard;
