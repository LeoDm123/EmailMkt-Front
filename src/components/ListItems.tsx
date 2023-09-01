import * as React from "react";
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
import { useNavigate } from "react-router-dom";

function ListItems() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

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
        </List>
      </Collapse>
    </List>
  );
}

export default ListItems;
