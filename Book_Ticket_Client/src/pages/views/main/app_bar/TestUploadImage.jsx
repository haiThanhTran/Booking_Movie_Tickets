import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Input,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createNewFilm } from "../../../../redux/actions/filmActions";

const TestUploadImage = () => {
  const dispatch = useDispatch();
  const [filmName, setFilmName] = useState("");
  const [des, setDes] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [status, setStatus] = useState("");

  const fileInputRef = useRef(null);
  const fileInputBannerRef = useRef(null);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const submitFile = async () => {
    const fileInput = fileInputRef.current;
    const fileInputBanner = fileInputBannerRef.current;
    const formData = new FormData();
    formData.append("imageFilm", fileInput.files[0]);
    formData.append("imageFilmBanner", fileInputBanner.files[0]);
    formData.append("title", filmName);
    formData.append("description", des);
    formData.append("trailerUrl", trailerUrl);
    formData.append("rateStart", "0");
    formData.append("status", status);
    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    console.log(formDataObj);

    try {
      console.log("formData:", formData);
      dispatch(createNewFilm(formData));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        height: "100vh",
        gap: "20px",
      }}
    >
      <TextField
        label="Tên Film"
        value={filmName}
        onChange={(e) => setFilmName(e.target.value)}
        sx={{ marginLeft: "20px", flex: 1 }}
      />
      <TextField
        label="Mô tả"
        value={des}
        onChange={(e) => setDes(e.target.value)}
        sx={{ marginLeft: "20px", flex: 1 }}
      />
      <TextField
        label="Trailer Url"
        value={trailerUrl}
        onChange={(e) => setTrailerUrl(e.target.value)}
        sx={{ marginLeft: "20px", flex: 1 }}
      />
      <FormControl sx={{ flex: 1, minWidth: "30px" }}>
        <InputLabel id="demo-simple-select-label">Trạng Thái</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Trạng Thái"
          onChange={handleChangeStatus}
        >
          <MenuItem value="current">Đang Chiếu</MenuItem>
          <MenuItem value="upcoming">Sắp Chiếu</MenuItem>
        </Select>
      </FormControl>

      <InputLabel id="demo-simple-select-label">Ảnh film</InputLabel>
      <Input
        type="file"
        id="fileInput"
        name="imageFilm"
        inputRef={fileInputRef}
      />

      <InputLabel id="demo-simple-select-label">Ảnh banner</InputLabel>
      <Input
        type="file"
        id="fileInputBanner"
        name="imageFilmBanner"
        inputRef={fileInputBannerRef}
      />

      <Button
        sx={{
          border: "none",
          cursor: "pointer",
          zIndex: 10,
          borderRadius: "5px",
          fontSize: "16px",
          fontWeight: "400",
          backgroundColor: "#ff6347",
          color: "#fff",
        }}
        onClick={submitFile}
      >
        Upload
      </Button>
    </Box>
  );
};

export default TestUploadImage;
