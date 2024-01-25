import * as React from "react";
import { useState, useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SettingsIcon from "@mui/icons-material/Settings";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import serverAPI from "../../../api/serverAPI";

function ClientMenu() {
  const [open, setOpen] = React.useState(true);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const resp = await serverAPI.get("/auth/getUserByEmail", {
          params: { userEmail: loggedInUserEmail },
        });
        setUserRole(resp.data.rol);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    if (loggedInUserEmail) {
      fetchUserRole();
    }
  }, [loggedInUserEmail]);

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={() => navigate("/ClientDashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/ClientDashboard")}>
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText primary="Email" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/ClientDashboard")}>
        <ListItemIcon>
          <LinkedInIcon />
        </ListItemIcon>
        <ListItemText primary="LinkedIn" />
      </ListItemButton>
    </List>
  );
}

export default ClientMenu;
