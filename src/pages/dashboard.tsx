import * as React from "react";
import { useState, useEffect } from "react";
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
import Capital from "../components/capital/CapDisp";
import Skeleton from "@mui/material/Skeleton";
import "../css/App.css";
import { CapButton, EditCapButton } from "../components/capital/CapButton";
import OpCard from "../components/operaciones/OpCard";
import { AddOp } from "../components/operaciones/OpButtons";
import OpModal from "../components/operaciones/OpModal";
import CapModal from "../components/capital/CapModal";
import ListItems from "../components/ListItems";
import InfoExtraCap from "../components/capital/CapInfoExtra";
import CapEditModal from "../components/capital/EditCapModal";

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
  const [operationStatusChanged, setOperationStatusChanged] = useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalCapOpen, setModalCapOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const OnClick = () => {
    setModalOpen(true);
  };

  const OnClickCap = () => {
    setModalCapOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseModalCap = () => {
    setModalCapOpen(false);
  };

  const handleOpenModalEdit = () => {
    setIsModalOpen(true);
  };

  const handleCloseModalEdit = () => {
    setIsModalOpen(false);
  };

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

  console.log(operationStatusChanged);
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
          <ListItems />
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
              <Grid item xs={12} md={8} lg={5}>
                {/* Capital disponible */}
                <Grid item xs={12} md={12} lg={12}>
                  <Paper
                    sx={{
                      paddingX: 3,
                      display: "flex",
                      flexDirection: "column",
                      height: 310,
                    }}
                  >
                    <h2 className="titulo my-3">Capital Disponible</h2>
                    <Divider
                      sx={{ borderColor: "#42a5f5", borderWidth: 1.5 }}
                    />
                    <Capital operationStatus={handleOperationChange} />
                    <CapModal
                      open={modalCapOpen}
                      onClose={handleCloseModalCap}
                      onOperationChange={handleOperationChange}
                    />
                    <div className="d-flex align-items-center">
                      <EditCapButton handleOpenModal={handleOpenModalEdit} />
                      <CapButton handleClick={OnClickCap} />
                    </div>
                    <CapEditModal
                      open={isModalOpen}
                      onClose={handleCloseModalEdit}
                    />
                  </Paper>
                </Grid>
                {/* Detalle de Capital */}
                <Grid item xs={12} md={12} lg={12}>
                  <Paper
                    sx={{
                      marginTop: 1.3,
                      paddingX: 3,
                      display: "flex",
                      flexDirection: "column",

                      height: 290,
                    }}
                  >
                    <h2 className="titulo my-3">Información Extra</h2>
                    <Divider
                      sx={{ borderColor: "#42a5f5", borderWidth: 1.5 }}
                    />
                    <InfoExtraCap operationStatus={handleOperationChange} />
                  </Paper>
                </Grid>
              </Grid>
              {/* Operaciones Vigentes */}
              <Grid item xs={12} md={4} lg={7}>
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
                    <OpModal
                      open={modalOpen}
                      onClose={handleCloseModal}
                      onOperationChange={handleOperationChange}
                    />
                    <AddOp handleClick={OnClick} />
                  </div>
                  <Divider sx={{ borderColor: "#42a5f5", borderWidth: 1.5 }} />
                  <Box sx={{ width: "100%", height: 500, overflow: "auto" }}>
                    {loading ? (
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={"100%"}
                        height={500}
                      />
                    ) : (
                      <OpCard onOperationChange={handleOperationChange} />
                    )}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
