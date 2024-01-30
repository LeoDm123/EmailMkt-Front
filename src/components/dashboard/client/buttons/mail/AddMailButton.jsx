import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import AddMailModal from "../../modals/mail/AddMailModal";

export default function AddMailButton({ onMailCreation }) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    console.log("fffffffffff");
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <ButtonGroup variant="contained" className="mt-1">
          <Button onClick={handleClick}>Add New Mail Campaign</Button>
        </ButtonGroup>
        <AddMailModal
          open={modalOpen}
          onClose={handleCloseModal}
          onMailCreation={onMailCreation}
        />
      </React.Fragment>
    </Grid>
  );
}
