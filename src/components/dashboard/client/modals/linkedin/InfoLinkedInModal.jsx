import React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseButton from "../../../../CloseButton";
import Title from "../../../../Title";
import InfoLinkedInFilterOneForm from "../../forms/linkedin/InfoLinkedInFilterOneForm";
import InfoLinkedInFilterTwoForm from "../../forms/linkedin/InfoLinkedInFilterTwoForm";
import InfoLinkedInFilterThreeForm from "../../forms/linkedin/InfoLinkedInFilterThreeForm";
import InfoLinkedInSubjectAndMessageForm from "../../forms/linkedin/InfoLinkedInSubjectAndMessageForm";

const steps = [
  "Title & Company",
  "Role",
  "Personal & Recent Updates",
  "Subject And Message",
];

const InfoLinkedInModal = ({ open, onClose, campaignID }) => {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleClose = () => {
    setActiveStep(0);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
          <Title>LinkedIn Campaign Information</Title>
          <CloseButton handleClick={handleClose} />
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
              ELinkedIn campaign created! Thank you!.
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <InfoLinkedInFilterOneForm campaignID={campaignID} />
            )}
            {activeStep === 1 && (
              <InfoLinkedInFilterTwoForm campaignID={campaignID} />
            )}
            {activeStep === 2 && (
              <InfoLinkedInFilterThreeForm campaignID={campaignID} />
            )}
            {activeStep === 3 && (
              <InfoLinkedInSubjectAndMessageForm campaignID={campaignID} />
            )}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep === 0 && (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Next
                </Button>
              )}

              {activeStep === 1 && (
                <>
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Next
                  </Button>
                </>
              )}

              {activeStep === 2 && (
                <>
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Next
                  </Button>
                </>
              )}
              {activeStep === 3 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </Paper>
    </Modal>
  );
};

export default InfoLinkedInModal;
