import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import EditMailAdminModal from "../../modals/mails/EditMailAdminModal";

export default function EditMailCampaignAdminButton({
  campaignID,
  onMailEdit,
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
      <EditMailAdminModal
        open={modalOpen}
        onClose={handleCloseModal}
        campaignID={campaignID}
        onMailEdit={onMailEdit}
      />
    </Grid>
  );
}
