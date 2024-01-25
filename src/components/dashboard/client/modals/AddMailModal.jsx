import React from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseButton from "../../../CloseButton";
import Title from "../../../Title";
import AddMailFilterForm from "../forms/AddMailFilterForm";
import AddMailSubjectAndMessageForm from "../forms/AddMailSubjectAndMessageForm";
import AddMailOptionsForm from "../forms/AddMailOptionsForm";

const steps = ["Filters", "Subject And Message", "Options"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddMailFilterForm />;
    case 1:
      return <AddMailSubjectAndMessageForm />;
    case 2:
      return <AddMailOptionsForm />;
    default:
      throw new Error("Unknown step");
  }
}

const AddMailModal = ({ open, onClose, onMailCreation }) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          height: "100%",
        }}
        className="CreateModal"
      >
        <Grid className="d-flex justify-content-between mb-2">
          <Title>Add new e-mail campaign</Title>
          <CloseButton handleClick={onClose} />
        </Grid>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}

              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Place order" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
    </Modal>
  );
};

export default AddMailModal;
