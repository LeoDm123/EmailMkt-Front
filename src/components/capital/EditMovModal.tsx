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

interface EditMovModalProps {
  open: boolean;
  onClose: () => void;
  movimiento: NullableData | null; // Update the type here
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
  {
    value: "ARS",
    label: "ARS",
  },
];

const detalles = [
  {
    value: "Ingreso",
    label: "Ingreso de Capital",
  },
  {
    value: "Retiro",
    label: "Retiro de Capital",
  },
  {
    value: "Prestamo",
    label: "Ingreso de Prestamo",
  },
  {
    value: "Devolucion",
    label: "Devolución de Prestamo",
  },
];

const EditMovModal: React.FC<EditMovModalProps> = ({
  open,
  onClose,
  onOperationChange,
  movimiento,
}) => {
  const [Detalle, setDetalle] = useState("");
  const [Divisa, setDivisa] = useState("");
  const [Monto, setMonto] = useState("");
  const [Comentarios, setComentarios] = useState("");
  const [dateValue, setDateValue] = useState("");

  useEffect(() => {
    if (movimiento) {
      setDetalle(movimiento.Detalle);
      setDivisa(movimiento.Divisa);
      setMonto(movimiento.Monto.toString());
      setComentarios(movimiento.Comentarios);
      setDateValue(movimiento.Fecha.toString());
    }
  }, [movimiento]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Detalle === "" || Divisa === "" || Monto === "" || !movimiento) {
      return console.log("Todos los campos son obligatorios");
    }

    console.log("iD:", movimiento._id);

    const parsedDate = parseDate(dateValue);

    if (!parsedDate) {
      console.log("Invalid date format");
      return;
    }

    try {
      await serverAPI.put(`/cap/EditMovimiento/${movimiento._id}`, {
        Detalle,
        Divisa,
        Monto: parseFloat(Monto),
        Comentarios,
        Fecha: dateValue,
      });

      onOperationChange();
      onClose();
    } catch (error) {
      console.error("Error al editar el movimiento:", error);
    }
  };

  const DeleteOp = async (_id: string) => {
    try {
      const deleteResp = await serverAPI.delete(`/cap/DeleteMov/${_id}`);

      if (deleteResp.data.message === "Movimiento deleted successfully") {
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

  function parseDate(dateString: string) {
    // Split the date and time parts
    const parts = dateString.split(", ");
    if (parts.length === 2) {
      const datePart = parts[0];
      const timePart = parts[1];

      // Split the date into MM, DD, YYYY parts
      const dateParts = datePart.split("/");
      if (dateParts.length === 3) {
        const month = parseInt(dateParts[0], 10) - 1; // Months are 0-indexed
        const day = parseInt(dateParts[1], 10);
        const year = parseInt(dateParts[2], 10);

        // Parse the time part
        const timeParts = timePart.split(":");
        if (timeParts.length === 3) {
          let hour = parseInt(timeParts[0], 10);
          const minute = parseInt(timeParts[1], 10);
          const second = parseInt(timeParts[2], 10);

          // Check if AM or PM
          const isPM = timePart.toLowerCase().includes("pm");
          if (
            isNaN(month) ||
            isNaN(day) ||
            isNaN(year) ||
            isNaN(hour) ||
            isNaN(minute) ||
            isNaN(second)
          ) {
            return null; // Invalid date or time format
          }

          // Adjust hour for AM/PM
          if (isPM && hour !== 12) {
            hour += 12;
          } else if (!isPM && hour === 12) {
            hour = 0;
          }

          // Create a Date object
          return new Date(year, month, day, hour, minute, second);
        }
      }
    }
    return null; // Invalid date format
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40%",
        }}
        className="CreateModal"
      >
        <form id="editForm" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between mb-2">
            <h1 className="h3">Editar Movimiento de Capital</h1>
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
              <div className="d-flex">
                <div className="w-50 mt-3">
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
                <div className="w-50 mt-3 ms-2">
                  <TextField
                    label="Fecha"
                    type="text"
                    className="w-100"
                    value={dateValue}
                    onChange={(e) => setDateValue(e.target.value)}
                    placeholder="yyyy-mm-dd"
                  />
                </div>
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
              </div>

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
          <div className="row justify-content-center">
            <button
              className="btn btn-danger w-25 py-2 mt-4"
              onClick={() => movimiento && SwAlertDelete(movimiento._id)}
            >
              Borrar
            </button>

            <button
              className="btn btn-primary w-50 py-2 mt-4 ms-2"
              type="submit"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </Paper>
    </Modal>
  );
};

export default EditMovModal;
