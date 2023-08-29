import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import OpModal from "./OpModal";

export function OpOkButton({ handleClick }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        sx={{ width: 150 }}
        endIcon={<CheckCircleIcon />}
        color="success"
        onClick={handleClick}
      >
        Aceptar
      </Button>
    </Stack>
  );
}

export function OpCancelButton({ handleClick }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        sx={{ width: 150 }}
        endIcon={<CancelIcon />}
        color="error"
        onClick={handleClick}
      >
        Cancelar
      </Button>
    </Stack>
  );
}

export function AddOp() {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="mt-2 w-100">
      <div className="d-flex justify-content-end">
        <div>
          <Button
            variant="contained"
            onClick={handleClick}
            endIcon={<AddCircleIcon />}
          >
            Nueva Operación
          </Button>
          <OpModal open={modalOpen} onClose={handleCloseModal} />
        </div>
      </div>
    </div>
  );
}
