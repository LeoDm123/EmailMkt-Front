import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import serverAPI from "../../api/serverAPI";
import { NullableData } from "./DataTypes";
import swal from "sweetalert";

interface CapModalProps {
  open: boolean;
  onClose: () => void;
  operation: NullableData;
  onOperationChange: () => void;
}

const currencies = [
  {
    value: "USD",
    label: "U$D",
  },
  {
    value: "EUR",
    label: "€",
  },
];

const detalles = [
  {
    value: "Compra",
    label: "Compra",
  },
  {
    value: "Venta",
    label: "Venta",
  },
];

const OpEditModal: React.FC<CapModalProps> = ({
  open,
  onClose,
  onOperationChange,
  operation,
}) => {
  const [Detalle, setDetalle] = useState("");
  const [Divisa, setDivisa] = useState("");
  const [Monto, setMonto] = useState("");
  const [TipoCambio, setTipoCambio] = useState("");
  const [Comentarios, setComentarios] = useState("");
  const [MontoTotal, setMontoTotal] = useState("");

  useEffect(() => {
    if (operation) {
      setDetalle(operation.Detalle);
      setDivisa(operation.Divisa);
      setMonto(operation.Monto.toString());
      setTipoCambio(operation.TipoCambio.toString());
      setComentarios(operation.Comentarios);
      setMontoTotal(operation.MontoTotal.toString());
    }
  }, [operation]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      Detalle === "" ||
      Divisa === "" ||
      Monto === "" ||
      TipoCambio === "" ||
      !operation
    ) {
      return console.log("Todos los campos son obligatorios");
    }

    try {
      await serverAPI.put(`/op/EditOp/${operation._id}`, {
        Detalle,
        Divisa,
        Monto: parseFloat(Monto),
        TipoCambio: parseFloat(TipoCambio),
        Comentarios,
        MontoTotal: parseFloat(MontoTotal),
      });

      onOperationChange();
      onClose();
    } catch (error) {
      console.error("Error al editar la operación:", error);
    }
  };

  const DeleteOp = async (_id: string) => {
    try {
      const deleteResp = await serverAPI.delete(`/op/DeleteOp/${_id}`);

      if (deleteResp.data.message === "Operation deleted successfully") {
        console.log(deleteResp);
      } else {
        console.log("Cancel operation failed.");
      }
      onOperationChange();
    } catch (error) {
      console.error(error);
    }
  };

  const SwAlertDelete = (_id: string) => {
    swal({
      title: "¿Desea borrar la operación?",
      text: "Una vez borrada, esta no podrá ser recuperada",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        swal("¡Operación borrada con éxito!", {
          icon: "success",
        });
        DeleteOp(_id);
        onClose();
      }
    });
  };

  useEffect(() => {
    if (Monto !== "" && TipoCambio !== "") {
      const MontoTotal = parseFloat(Monto) * parseFloat(TipoCambio);
      setMontoTotal(MontoTotal.toString());
    }
  }, [Monto, TipoCambio]);

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="CreateModal"
      >
        <form id="editForm" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between mb-2">
            <h1 className="h3">Editar Operación</h1>
            <HighlightOffIcon
              onClick={onClose}
              fontSize="large"
              sx={{ color: "#6a6a6a" }}
            />
          </div>

          <div className="d-flex flex-direction-row">
            <div className="w-100 me-3">
              <div className="w-100 mt-3">
                <TextField
                  id="outlined-select-currency"
                  className="w-100"
                  select
                  label="Detalle"
                  value={Detalle}
                  onChange={(e) => setDetalle(e.target.value)}
                  helperText="Por favor, seleccione el tipo de movimiento"
                >
                  {detalles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="w-100 mt-3">
                <TextField
                  id="outlined-select-currency"
                  className="w-100"
                  select
                  label="Divisa"
                  value={Divisa}
                  onChange={(e) => setDivisa(e.target.value)}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="d-flex">
                <div className="w-50">
                  <FormControl fullWidth className="mt-3">
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Monto
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">
                          {Divisa}
                        </InputAdornment>
                      }
                      label="Monto"
                      value={Monto}
                      onChange={(e) => setMonto(e.target.value)}
                    />
                  </FormControl>
                </div>
                <div className="w-50 ms-2">
                  <FormControl fullWidth className="mt-3">
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Tipo de Cambio
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Tipo de Cambio"
                      value={TipoCambio}
                      onChange={(e) => setTipoCambio(e.target.value)}
                    />
                  </FormControl>
                </div>
              </div>

              <p>Monto total de la operación: ${MontoTotal}</p>

              <TextField
                fullWidth
                className="mt-3"
                id="outlined-multiline-static"
                label="Comentarios"
                multiline
                rows={4}
                value={Comentarios}
                onChange={(e) => setComentarios(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              className="btn btn-danger w-25 py-2 mt-4"
              onClick={() => operation && SwAlertDelete(operation._id)}
            >
              Borrar
            </button>

            <button className="btn btn-primary w-75 py-2 mt-4" type="submit">
              Guardar Cambios
            </button>
          </div>
        </form>
      </Paper>
    </Modal>
  );
};

export default OpEditModal;
