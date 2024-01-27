import React from "react";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import EditMailModal from "../../modals/mail/EditMailModal";

export default function EditMailCampaignButton({ campaignID, onMailEdit }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <IconButton className="d-flex justify-content-center" onClick={handleClick}>
      <EditIcon />
      <EditMailModal
        open={modalOpen}
        onClose={handleCloseModal}
        campaignID={campaignID}
        onMailEdit={onMailEdit}
      />
    </IconButton>
  );
}
