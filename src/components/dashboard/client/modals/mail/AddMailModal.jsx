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
import swal from "sweetalert";
import serverAPI from "../../../../../api/serverAPI";
import Title from "../../../../Title";
import AddMailFilterForm from "../../forms/mail/AddMailFilterForm";
import AddMailSubjectAndMessageForm from "../../forms/mail/AddMailSubjectAndMessageForm";
import AddMailOptionsForm from "../../forms/mail/AddMailOptionsForm";

const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

const steps = ["Filters", "Subject And Message", "Options"];

const AddMailModal = ({ open, onClose, onMailCreation }) => {
  const [formData, setFormData] = useState({
    CampaignTitle: "",
    NameFilter: "",
    EmployeesNrFilter: "",
    JobTitlesFilter: "",
    IndustriesFilter: "",
    CompanyNameFilter: "",
    KeywordsFilter: "",
    RevenueFilter: "",
    DepartmentFilter: "",
    LocationFilter: "",
    Subject: "",
    Message: "",
    Variant: "",
    NoHtml: false,
    RemoveContacts: false,
    OnlyVerified: false,
    CustomTracking: false,
    ABTesting: false,
    RequestCurrentJob: false,
    RequestRecentNews: false,
    RequestCompanyMission: false,
    BasicWarming: false,
    AdvancedWarming: false,
  });

  const createMailCampaign = async (
    loggedInUserEmail,
    CampaignTitle,
    NameFilter,
    EmployeesNrFilter,
    JobTitlesFilter,
    IndustriesFilter,
    CompanyNameFilter,
    KeywordsFilter,
    RevenueFilter,
    DepartmentFilter,
    LocationFilter,
    Subject,
    Message,
    Variant,
    NoHtml,
    RemoveContacts,
    OnlyVerified,
    CustomTracking,
    ABTesting,
    RequestCurrentJob,
    RequestRecentNews,
    RequestCompanyMission,
    BasicWarming,
    AdvancedWarming
  ) => {
    try {
      const resp = await serverAPI.post("/mails/createMailCampaign", {
        loggedInUserEmail,
        CampaignTitle,
        NameFilter,
        EmployeesNrFilter,
        JobTitlesFilter,
        IndustriesFilter,
        CompanyNameFilter,
        KeywordsFilter,
        RevenueFilter,
        DepartmentFilter,
        LocationFilter,
        Subject,
        Message,
        Variant,
        NoHtml,
        RemoveContacts,
        OnlyVerified,
        CustomTracking,
        ABTesting,
        RequestCurrentJob,
        RequestRecentNews,
        RequestCompanyMission,
        BasicWarming,
        AdvancedWarming,
      });

      if (resp.data.msg === "Internal server error") {
        SwAlertError();
      } else {
        SwAlertOk();
        onClose();
        onMailCreation();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const SwAlertOk = () => {
    swal({
      title: "¡Success!",
      text: "Mail campaign created correctly",
      icon: "success",
    });
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "Internal server error",
      icon: "error",
    });
  };

  const [activeStep, setActiveStep] = React.useState(0);

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

  const handleFormChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleFormSubmit = () => {
    createMailCampaign(
      loggedInUserEmail,
      formData.CampaignTitle,
      formData.NameFilter,
      formData.EmployeesNrFilter,
      formData.JobTitlesFilter,
      formData.IndustriesFilter,
      formData.CompanyNameFilter,
      formData.KeywordsFilter,
      formData.RevenueFilter,
      formData.DepartmentFilter,
      formData.LocationFilter,
      formData.Subject,
      formData.Message,
      formData.Variant,
      formData.NoHtml,
      formData.RemoveContacts,
      formData.OnlyVerified,
      formData.CustomTracking,
      formData.ABTesting,
      formData.RequestCurrentJob,
      formData.RequestRecentNews,
      formData.RequestCompanyMission,
      formData.BasicWarming,
      formData.AdvancedWarming
    );

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
          <Title>Add new email campaign</Title>
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
              Email campaign created! Thank you!.
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <AddMailFilterForm
                formData={formData}
                handleFormChange={handleFormChange}
              />
            )}
            {activeStep === 1 && (
              <AddMailSubjectAndMessageForm
                formData={formData}
                handleFormChange={handleFormChange}
              />
            )}
            {activeStep === 2 && (
              <AddMailOptionsForm
                formData={formData}
                handleFormChange={handleFormChange}
              />
            )}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}

              <Button
                variant="contained"
                onClick={
                  activeStep === steps.length - 1
                    ? handleFormSubmit
                    : handleNext
                }
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Create campaign" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
    </Modal>
  );
};

export default AddMailModal;
