import { Box } from "@mui/material";
import React from "react";
import App_bar from "./views/main/app_bar/App_bar";
import ListBoard from "./views/main/list_board/List_board";


function Pages() {
  return (
    <>
      <App_bar />
      <ListBoard />
    </>
  );
}

export default Pages;
