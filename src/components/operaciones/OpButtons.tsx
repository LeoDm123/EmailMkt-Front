import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import serverAPI from "../../api/serverAPI";

interface OpOkButtonProps {
  handleClick: () => void;
}

export function OpOkButton({ handleClick }: OpOkButtonProps) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        sx={{ width: 150, borderRadius: 10 }}
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
        sx={{ width: 150, borderRadius: 10 }}
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
            style={{ borderRadius: 10 }}
          >
            Nueva Operación
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ShowEditButtonProps {
  setShowEditButton: (value: boolean) => void;
}

export function ShowEditButton({ setShowEditButton }: ShowEditButtonProps) {
  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
  const [userRole, setUserRole] = useState("");

  const [EditState, setEditState] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const resp = await serverAPI.get("/auth/getUserByEmail", {
          params: { email: loggedInUserEmail },
        });
        setUserRole(resp.data.rol);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    if (loggedInUserEmail) {
      fetchUserRole();
    }
  }, [loggedInUserEmail]);

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<EditIcon />}
        style={{
          display: userRole === "admin" ? "flex" : "none",
          marginTop: 17,
          borderRadius: 10,
        }}
        onClick={() => {
          setShowEditButton(EditState);
          setEditState(!EditState);
          console.log(EditState);
        }}
      >
        Editar
      </Button>
    </div>
  );
}

interface EditButtonProps {
  visible: boolean;
  handleClick: () => void;
}

export function EditButton({ visible, handleClick }: EditButtonProps) {
  return (
    <IconButton
      aria-label="edit"
      style={{
        display: visible ? "flex" : "none",
        marginTop: 5,
      }}
      onClick={handleClick}
    >
      <EditIcon />
    </IconButton>
  );
}
