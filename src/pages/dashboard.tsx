import * as React from "react";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Capital from "../components/capital/CapDisp";
import Skeleton from "@mui/material/Skeleton";
import "../css/App.css";
import { CapButton, EditCapButton } from "../components/capital/CapButton";
import OpCard from "../components/operaciones/OpCard";
import { AddOp } from "../components/operaciones/OpButtons";
import OpModal from "../components/operaciones/OpModal";
import CapModal from "../components/capital/CapModal";
import InfoExtraCap from "../components/capital/CapInfoExtra";
import CapEditModal from "../components/capital/EditCapModal";
import { DividerTitle } from "../components/Dividers";
import Header from "../components/menu/Header";

const defaultTheme = createTheme();

const Dashboard = () => {
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header
        content={
          <Container maxWidth="xl" sx={{ mt: 1, mb: 2 }}>
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
                      borderRadius: 5,
                    }}
                  >
                    <h2 className="titulo my-2">Capital Disponible</h2>
                    <DividerTitle />
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
                      borderRadius: 5,
                      height: 290,
                    }}
                  >
                    <h2 className="titulo my-2">Información Extra</h2>
                    <DividerTitle />
                    <Box
                      sx={{
                        marginY: 1,
                        width: "100%",
                        height: 500,
                        overflowY: "auto",
                        scrollbarWidth: "thin",
                        scrollbarColor: "dark",
                        "&::-webkit-scrollbar": {
                          width: "8px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "lightgray",
                          borderRadius: "5px",
                        },
                      }}
                    >
                      <InfoExtraCap operationStatus={handleOperationChange} />
                    </Box>
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
                    borderRadius: 5,
                  }}
                >
                  <div className="d-flex align-items-center">
                    <h2 className="titulo my-2 w-100">Operaciones Activas</h2>
                    <OpModal
                      open={modalOpen}
                      onClose={handleCloseModal}
                      onOperationChange={handleOperationChange}
                    />
                    <AddOp handleClick={OnClick} />
                  </div>
                  <DividerTitle />
                  <Box
                    sx={{
                      width: "100%",
                      height: 500,
                      overflow: "auto",
                      scrollbarWidth: "thin",
                      scrollbarColor: "dark",
                      "&::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "lightgray",
                        borderRadius: "5px",
                      },
                    }}
                  >
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
        }
      />
    </ThemeProvider>
  );
};

export default Dashboard;
