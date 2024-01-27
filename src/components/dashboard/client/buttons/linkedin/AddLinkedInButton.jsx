import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import AddLinkedInModal from "../../modals/linkedin/AddLinkedInModal";

export default function AddMailButton({ onLinkedInCreation }) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid>
      <ButtonGroup variant="contained" className="mt-1">
        <Button onClick={handleClick} sx={{ width: 260 }}>
          Add New LinkedIn Campaign
        </Button>
      </ButtonGroup>
      <AddLinkedInModal
        open={modalOpen}
        onClose={handleCloseModal}
        onLinkedInCreation={onLinkedInCreation}
      />
    </Grid>
  );
}
