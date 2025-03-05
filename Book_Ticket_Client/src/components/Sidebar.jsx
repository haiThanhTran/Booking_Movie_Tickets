import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { People, EventSeat, Movie } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          marginTop: 8,
        },
      }}
    >
      <List>
        <ListItem button onClick={() => navigate("/bookings")}>
          <ListItemIcon>
            <EventSeat />
          </ListItemIcon>
          <ListItemText primary="Quản lý booking" />
        </ListItem>
        <ListItem button onClick={() => navigate("/movies")}>
          <ListItemIcon>
            <Movie />
          </ListItemIcon>
          <ListItemText primary="Quản lý phim" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
