import React from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface CurrencyEditModalProps {
  open: boolean;
  onClose: () => void;
}

const UserEditModal: React.FC<CurrencyEditModalProps> = ({ open, onClose }) => {
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
      >
        <div className="d-flex justify-content-between mb-2">
          <h1 className="h3">Modificar Datos de Usuario</h1>
          <HighlightOffIcon
            onClick={onClose}
            fontSize="large"
            sx={{ color: "#6a6a6a" }}
          />
        </div>
      </Paper>
    </Modal>
  );
};

export default UserEditModal;
