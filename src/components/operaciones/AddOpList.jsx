import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import UploadComponent from "./UploadComponent";
import serverAPI from "../../api/serverAPI";

const AddOpList = ({ open, onClose, onMatSubmit }) => {
  const [uploadedData, setUploadedData] = useState([]);

  const OperacionList = async (
    Detalle,
    Divisa,
    Monto,
    TipoCambio,
    MontoTotal,
    Comentarios,
    Email
  ) => {
    try {
      const resp = await serverAPI.post("/op/OperacionList", {
        Detalle,
        Divisa,
        Monto: Monto.toString(),
        TipoCambio: TipoCambio.toString(),
        MontoTotal: MontoTotal.toString(),
        Comentarios,
        Email,
      });

      console.log("resp:", resp);
      SwAlert();
      onClose();
    } catch (error) {
      SwAlertErrorFondos();
    }
  };

  const handleFileUpload = async (jsonData) => {
    const dataToUpload = [];

    for (const row of jsonData) {
      if (
        row.some((cell) => cell !== undefined && cell !== null && cell !== "")
      ) {
        const [
          Detalle,
          Divisa,
          Monto,
          TipoCambio,
          MontoTotal,
          Comentarios,
          Email,
        ] = row;

        dataToUpload.push({
          Detalle,
          Divisa,
          Monto,
          TipoCambio,
          MontoTotal,
          Comentarios,
          Email,
        });
      }
    }

    setUploadedData(dataToUpload);
  };

  const handleConfirmUpload = async () => {
    console.log("UploadedData", uploadedData);
    try {
      for (const operacion of uploadedData) {
        await OperacionList(
          operacion.Detalle,
          operacion.Divisa,
          operacion.Monto,
          operacion.TipoCambio,
          operacion.MontoTotal,
          operacion.Comentarios,
          operacion.Email
        );
      }

      console.log("Todos los materiales han sido cargados con éxito.");
      setUploadedData([]);
      onClose();
    } catch (error) {
      console.error("Error al cargar los materiales:", error);
    }
  };

  const SwAlert = () => {
    swal({
      title: "¡Exito!",
      text: "La operación se agregó correctamente",
      icon: "success",
      timer: 1000,
    });
  };

  const SwAlertErrorFondos = () => {
    swal({
      title: "¡Error!",
      text: "No posee los fondos suficientes para realizar la operación",
      icon: "error",
      timer: 1000,
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
        }}
        className="CreateModal"
      >
        <UploadComponent onFileUpload={handleFileUpload} onClose={onClose} />
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          sx={{
            marginTop: 2,
          }}
        >
          <React.Fragment>
            <Grid
              sx={{
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
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className="text-center fw-bold">
                      Detalle
                    </TableCell>
                    <TableCell className="text-center fw-bold">
                      Divisa
                    </TableCell>
                    <TableCell className="text-center fw-bold">Monto</TableCell>
                    <TableCell className="text-center fw-bold">
                      Tipo de Cambio
                    </TableCell>
                    <TableCell className="text-center fw-bold">
                      Monto Total
                    </TableCell>
                    <TableCell className="text-center fw-bold">
                      Comentarios
                    </TableCell>
                  </TableRow>
                </TableHead>
                {uploadedData.length > 0 && (
                  <TableBody sx={{}}>
                    {uploadedData.map((operacion, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-center">
                          {operacion.Detalle}
                        </TableCell>
                        <TableCell className="text-center">
                          {operacion.Divisa}
                        </TableCell>
                        <TableCell className="text-center">
                          {operacion.Monto}
                        </TableCell>
                        <TableCell className="text-center">
                          {operacion.TipoCambio}
                        </TableCell>
                        <TableCell className="text-center">
                          {operacion.MontoTotal}
                        </TableCell>
                        <TableCell className="text-center">
                          {operacion.Comentarios}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </Grid>

            <Button onClick={handleConfirmUpload} sx={{ marginTop: 2 }}>
              Confirmar Carga
            </Button>
          </React.Fragment>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default AddOpList;
