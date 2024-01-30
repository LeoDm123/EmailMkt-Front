import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import EditLinkedInModal from "../../modals/linkedin/EditLinkedInModal";

export default function EditLinkedCampaignButton({
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
      <EditLinkedInModal
        open={modalOpen}
        onClose={handleCloseModal}
        campaignID={campaignID}
        onLinkedInEdit={onLinkedInEdit}
      />
    </Grid>
  );
}
