import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Capital from "../components/capital/CapDisp";
import "../css/App.css";
import { useNavigate } from "react-router-dom";
import CapButton from "../components/capital/CapButton";
import OpCard from "../components/opreaciones/OpCard";
import ArticleIcon from "@mui/icons-material/Article";
import { AddOp } from "../components/opreaciones/OpButtons";
import { ListItemButton, ListItemIcon } from "@mui/material";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

window.onbeforeunload = () => {
  localStorage.removeItem("loggedUser");
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/informacion");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              ¡Bienvenido {loggedInUserEmail}!
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItem disablePadding>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Informes" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Capital disponible */}
              <Grid item xs={12} md={8} lg={4}>
                <Paper
                  sx={{
                    paddingX: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: 310,
                  }}
                >
                  <h2 className="titulo my-3">Capital Disponible</h2>
                  <Divider sx={{ borderColor: "#42a5f5", borderWidth: 1.5 }} />
                  <Capital />
                  <CapButton />
                </Paper>
              </Grid>
              {/* Operaciones Vigentes */}
              <Grid item xs={12} md={4} lg={8}>
                <Paper
                  sx={{
                    paddingX: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 610,
                  }}
                >
                  <div className="d-flex align-items-center">
                    <h2 className="titulo my-3 w-75">Operaciones Activas</h2>
                    <AddOp />
                  </div>
                  <Divider sx={{ borderColor: "#42a5f5", borderWidth: 1.5 }} />
                  <Box
                    sx={{ width: "100%", maxHeight: "500px", overflow: "auto" }}
                  >
                    <OpCard />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            {/* <Grid item xs={12} md={8} lg={4} className="mt-3">
              <Paper
                sx={{
                  paddingX: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 285,
                }}
              >
                <h2 className="titulo my-3">Movimientos de Capital</h2>

                <Divider sx={{ borderColor: "#42a5f5", borderWidth: 1.5 }} />
                <TablaMovimientos />
              </Paper>
            </Grid> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;