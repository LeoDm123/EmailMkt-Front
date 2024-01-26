import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoLinkedInModal from "../../modals/linkedin/InfoLinkedInModal";

export default function LinkedCampaignInfoButton({ campaignID }) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid>
      <IconButton onClick={handleClick} color="primary">
        <InfoOutlinedIcon />
      </IconButton>
      <InfoLinkedInModal
        open={modalOpen}
        onClose={handleCloseModal}
        campaignID={campaignID}
      />
    </Grid>
  );
}
