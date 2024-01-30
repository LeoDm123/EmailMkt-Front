import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
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
    <Grid>
      <IconButton
        className="d-flex justify-content-center"
        onClick={handleClick}
      >
        <EditIcon />
      </IconButton>
      <EditLinkedInAdminModal
        open={modalOpen}
        onClose={handleCloseModal}
        campaignID={campaignID}
        onLinkedInEdit={onLinkedInEdit}
      />
    </Grid>
  );
}
