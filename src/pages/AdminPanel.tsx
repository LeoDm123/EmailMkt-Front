import * as React from "react";
import { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
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
import "../css/App.css";
import ListItems from "../components/ListItems";
import Skeleton from "@mui/material/Skeleton";
import UserList from "../components/admin/userList";
import CapitalOp from "../components/capital/CapOpList";
import CapOpsResetButton from "../components/capital/CapButton";
import { DividerTitle } from "../components/Dividers";

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

const defaultTheme = createTheme();

const AdminPanel = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [loading, setLoading] = useState(true);
  const [operationStatusChanged, setOperationStatusChanged] = useState(false);

  const handleOperationChange = () => {
    setOperationStatusChanged(!operationStatusChanged);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
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
          <ListItems />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[300]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <div className="d-flex w-100">
              <Grid spacing={1} sx={{ width: 600 }}>
                {/* Usuarios */}
                <Paper
                  sx={{
                    paddingX: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <h2 className="titulo my-3">Usuarios Activos</h2>

                  <DividerTitle />
                  {loading ? (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={"100%"}
                      height={"100%"}
                    />
                  ) : (
                    <UserList />
                  )}
                </Paper>
              </Grid>
              <Grid spacing={3} marginLeft={5} sx={{ width: 400 }}>
                {/* Divisas Operativas */}
                <Paper
                  sx={{
                    paddingX: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h2 className="titulo my-3">Divisas Operativas</h2>
                    <CapOpsResetButton
                      handleOperationChange={handleOperationChange}
                    />
                  </div>
                  <DividerTitle />
                  {loading ? (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={"100%"}
                      height={"100%"}
                    />
                  ) : (
                    <CapitalOp operationStatus={handleOperationChange} />
                  )}
                </Paper>
              </Grid>
            </div>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminPanel;
