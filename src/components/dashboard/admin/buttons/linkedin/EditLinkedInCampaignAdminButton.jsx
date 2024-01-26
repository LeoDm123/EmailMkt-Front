import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import EditLinkedInAdminModal from "../../modals/linkedin/EditLinkedInAdminModal";

export default function EditLinkedCampaignAdminButton({
  campaignID,
  onLinkedInEdit,
}) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <IconButton className="d-flex justify-content-center" onClick={handleClick}>
      <EditIcon />
      <EditLinkedInAdminModal
        open={modalOpen}
        onClose={handleCloseModal}
        campaignID={campaignID}
        onLinkedInEdit={onLinkedInEdit}
      />
    </IconButton>
  );
}
