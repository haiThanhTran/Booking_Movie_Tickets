import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import Pages from "./pages/_id";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TestUploadImage from "./pages/views/main/app_bar/TestUploadImage";
import Film_detail from "./pages/views/main/film/Film_detail";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from './redux/store'

const theme = createTheme({
  typography: {
    fontFamily: "'Nunito Sans', sans-serif",
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Pages />} />
            <Route path="/upload-new-film" element={<TestUploadImage />} />
            <Route path="/detail/:id" element={<Film_detail />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
