import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoMailModal from "../modals/InfoMailModal";

export default function MailCampaignInfoButton({ campaignID }) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid>
      <IconButton onClick={handleClick} color="primary" size="small">
        <InfoOutlinedIcon />
      </IconButton>
      <InfoMailModal
        open={modalOpen}
        onClose={handleCloseModal}
        campaignID={campaignID}
      />
    </Grid>
  );
}
