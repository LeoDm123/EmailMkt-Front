import Button from "@mui/material/Button";
import React from "react";
import CapModal from "./CapModal";

const CapButton = () => {
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
          <Button variant="contained" onClick={handleClick}>
            Agregar / Retirar Capital
          </Button>
          <CapModal open={modalOpen} onClose={handleCloseModal} />
        </div>
      </div>
    </div>
  );
};

export default CapButton;
