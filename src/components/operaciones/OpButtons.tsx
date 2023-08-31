import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface OpOkButtonProps {
  handleClick: () => void;
}

export function OpOkButton({ handleClick }: OpOkButtonProps) {
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

interface OpCancelButtonProps {
  handleClick: () => void;
}

export function OpCancelButton({ handleClick }: OpCancelButtonProps) {
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

interface AddOpProps {
  handleClick: () => void;
}

export function AddOp({ handleClick }: AddOpProps) {
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
        </div>
      </div>
    </div>
  );
}
