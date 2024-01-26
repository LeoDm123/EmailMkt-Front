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
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <ButtonGroup
          variant="contained"
          aria-label="split button"
          className="mb-3 mt-1"
        >
          <Button className="AddMailButton" onClick={handleClick}>
            Add New LinkedIn Campaign
          </Button>
        </ButtonGroup>
        <AddLinkedInModal
          open={modalOpen}
          onClose={handleCloseModal}
          onLinkedInCreation={onLinkedInCreation}
        />
      </React.Fragment>
    </Grid>
  );
}
