import * as React from "react";
import { useState, useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ArticleIcon from "@mui/icons-material/Article";
import PaidIcon from "@mui/icons-material/Paid";
import RepeatOnIcon from "@mui/icons-material/RepeatOn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import { useNavigate } from "react-router-dom";
import serverAPI from "../../api/serverAPI";

function ListItems() {
  const [open, setOpen] = React.useState(true);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

  useEffect(() => {
    // Fetch user role based on the loggedInUserEmail
    const fetchUserRole = async () => {
      try {
        const resp = await serverAPI.get("/auth/getUserByEmail", {
          params: { email: loggedInUserEmail },
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
      <ListItemButton onClick={() => navigate("/Dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary="Informes" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/InfoOps")}>
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText primary="Operaciones" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/InfoMovs")}>
            <ListItemIcon>
              <RepeatOnIcon />
            </ListItemIcon>
            <ListItemText primary="Mov. de Capital" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/Balance")}>
            <ListItemIcon>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="Balance" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InsertChartIcon />
        </ListItemIcon>
        <ListItemText primary="Gráficos" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/Charts")}>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Flujo de Caja" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton
        style={{ display: userRole === "admin" ? "flex" : "none" }}
        onClick={() => navigate("/AdminPanel")}
      >
        <ListItemIcon>
          <DisplaySettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Panel Admin" />
      </ListItemButton>
    </List>
  );
}

export default ListItems;
