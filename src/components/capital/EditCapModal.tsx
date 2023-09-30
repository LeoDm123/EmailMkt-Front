import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Button from "@mui/material/Button";
import swal from "sweetalert";
import serverAPI from "../../api/serverAPI";

interface CurrencyEditModalProps {
  open: boolean;
  onClose: () => void;
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

const CapEditModal: React.FC<CurrencyEditModalProps> = ({ open, onClose }) => {
  const [Divisa, setDivisa] = useState<string>("");
  const [Monto, setMonto] = useState<number>(0);

  const handleSave = async () => {
    if (isNaN(Monto) || Monto <= 0) {
      alert("Por favor, ingrese un monto válido mayor que cero.");
      return;
    }

    if (!Divisa) {
      alert("Por favor, ingrese una divisa válida.");
      return;
    }

    console.log(Divisa);
    console.log(Monto);

    try {
      await serverAPI.put("/cap/EditCap", {
        moneda: Divisa,
        monto: Monto,
      });

      SwAlert();
      onClose();
    } catch (error) {
      console.error("Error al editar la operación:", error);
    }
  };

  const SwAlert = () => {
    swal({
      title: "¡Exito!",
      text: "¡Monto editada con éxito!",
      icon: "success",
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
          width: "25%",
          borderRadius: 5,
        }}
      >
        <div className="d-flex justify-content-between mb-2">
          <h1 className="h3">Modificar Capital</h1>
          <HighlightOffIcon
            onClick={onClose}
            fontSize="large"
            sx={{ color: "#6a6a6a" }}
          />
        </div>
        <div className=" w-100 mt-3">
          <TextField
            id="outlined-select-currency"
            className="w-100"
            select
            label="Divisa"
            defaultValue=""
            onChange={(e) => setDivisa(e.target.value)}
            helperText="Por favor, seleccione su divisa"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        {/* MONTO */}
        <FormControl fullWidth className="mt-3">
          <InputLabel htmlFor="outlined-adornment-amount">Monto</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={
              <InputAdornment position="start">{Divisa}</InputAdornment>
            }
            label="monto"
            onChange={(e) => setMonto(parseFloat(e.target.value))}
          />
        </FormControl>
        <div className="mt-3 d-flex justify-content-end">
          <Button
            variant="contained"
            onClick={handleSave}
            style={{ borderRadius: 10 }}
          >
            Guardar nuevo monto
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};

export default CapEditModal;
