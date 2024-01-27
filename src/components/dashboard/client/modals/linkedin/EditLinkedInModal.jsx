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
import EditLinkedInFilterOneForm from "../../forms/linkedin/EditLinkedInFilterOneForm";
import EditLinkedInFilterTwoForm from "../../forms/linkedin/EditLinkedInFormTwoForm";
import EditLinkedInFilterThreeForm from "../../forms/linkedin/EditLinkedInFilterThreeForm";
import EditLinkedInSubjectAndMessageForm from "../../forms/linkedin/EditLinkedInSubjectAndMessageForm";

const steps = [
  "Title & Company",
  "Role",
  "Personal & Recent Updates",
  "Subject And Message",
];

const EditLinkedInModal = ({ open, onClose, campaignID, onLinkedInEdit }) => {
  const [formData, setFormData] = useState({
    CampaignTitle: "",
    CurrentCompanyNameFilter: "",
    CompanyHeadcountFilter: "",
    PastCompanyNameFilter: "",
    CompanyTypeFilter: "",
    CompanyHQLocationFilter: "",
    RoleFunctionFilter: "",
    CurrentJobTitleFilter: "",
    SeniorityLevelFilter: "",
    PastJobTitleFilter: "",
    YearsInCurrentCompanyFilter: "",
    YearsInCurrentPositionFilter: "",
    GeographyFilter: "",
    IndustryFilter: "",
    FirstNameFilter: "",
    LastNameFilter: "",
    ProfileLanguageFilter: "",
    YearsOfExperienceFilter: "",
    GroupsFilter: "",
    SchoolFilter: "",
    ChangedJobsFilter: "",
    PostedOnLinkedInFilter: "",
    Subject: "",
    Message: "",
    Variant: "",
  });

  const editLinkedInCampaign = async (
    CampaignTitle,
    CurrentCompanyNameFilter,
    CompanyHeadcountFilter,
    PastCompanyNameFilter,
    CompanyTypeFilter,
    CompanyHQLocationFilter,
    RoleFunctionFilter,
    CurrentJobTitleFilter,
    SeniorityLevelFilter,
    PastJobTitleFilter,
    YearsInCurrentCompanyFilter,
    YearsInCurrentPositionFilter,
    GeographyFilter,
    IndustryFilter,
    FirstNameFilter,
    LastNameFilter,
    ProfileLanguageFilter,
    YearsOfExperienceFilter,
    GroupsFilter,
    SchoolFilter,
    ChangedJobsFilter,
    PostedOnLinkedInFilter,
    Subject,
    Message,
    Variant
  ) => {
    try {
      const resp = await serverAPI.put(
        `/linkedin/editLinkedInCampaignByID/${campaignID}`,
        {
          CampaignTitle,
          CurrentCompanyNameFilter,
          CompanyHeadcountFilter,
          PastCompanyNameFilter,
          CompanyTypeFilter,
          CompanyHQLocationFilter,
          RoleFunctionFilter,
          CurrentJobTitleFilter,
          SeniorityLevelFilter,
          PastJobTitleFilter,
          YearsInCurrentCompanyFilter,
          YearsInCurrentPositionFilter,
          GeographyFilter,
          IndustryFilter,
          FirstNameFilter,
          LastNameFilter,
          ProfileLanguageFilter,
          YearsOfExperienceFilter,
          GroupsFilter,
          SchoolFilter,
          ChangedJobsFilter,
          PostedOnLinkedInFilter,
          Subject,
          Message,
          Variant,
        }
      );

      if (resp.data.msg === "Internal server error") {
        SwAlertError();
      } else {
        console.log(resp);

        SwAlertOk();
        onClose();
        onLinkedInEdit();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const SwAlertOk = () => {
    swal({
      title: "¡Success!",
      text: "LinkedIn campaign edited correctly",
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
    console.log("Form submitted:", formData);

    editLinkedInCampaign(
      formData.CampaignTitle,
      formData.CurrentCompanyNameFilter,
      formData.CompanyHeadcountFilter,
      formData.PastCompanyNameFilter,
      formData.CompanyTypeFilter,
      formData.CompanyHQLocationFilter,
      formData.RoleFunctionFilter,
      formData.CurrentJobTitleFilter,
      formData.SeniorityLevelFilter,
      formData.PastJobTitleFilter,
      formData.YearsInCurrentCompanyFilter,
      formData.YearsInCurrentPositionFilter,
      formData.GeographyFilter,
      formData.IndustryFilter,
      formData.FirstNameFilter,
      formData.LastNameFilter,
      formData.ProfileLanguageFilter,
      formData.YearsOfExperienceFilter,
      formData.GroupsFilter,
      formData.SchoolFilter,
      formData.ChangedJobsFilter,
      formData.PostedOnLinkedInFilter,
      formData.Subject,
      formData.Message,
      formData.Variant
    );

    onClose();
    handleClose();
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
          <Title>Edit LinkedIn campaign</Title>
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
              <EditLinkedInFilterOneForm
                CampaignTitle={formData.CampaignTitle}
                CurrentCompanyNameFilter={formData.CurrentCompanyNameFilter}
                CompanyHeadcountFilter={formData.CompanyHeadcountFilter}
                PastCompanyNameFilter={formData.PastCompanyNameFilter}
                CompanyTypeFilter={formData.CompanyTypeFilter}
                CompanyHQLocationFilter={formData.CompanyHQLocationFilter}
                handleFormChange={handleFormChange}
                campaignID={campaignID}
              />
            )}
            {activeStep === 1 && (
              <EditLinkedInFilterTwoForm
                RoleFunctionFilter={formData.RoleFunctionFilter}
                CurrentJobTitleFilter={formData.CurrentJobTitleFilter}
                SeniorityLevelFilter={formData.SeniorityLevelFilter}
                PastJobTitleFilter={formData.PastJobTitleFilter}
                YearsInCurrentCompanyFilter={
                  formData.YearsInCurrentCompanyFilter
                }
                YearsInCurrentPositionFilter={
                  formData.YearsInCurrentPositionFilter
                }
                handleFormChange={handleFormChange}
                campaignID={campaignID}
              />
            )}
            {activeStep === 2 && (
              <EditLinkedInFilterThreeForm
                GeographyFilter={formData.GeographyFilter}
                IndustryFilter={formData.IndustryFilter}
                FirstNameFilter={formData.FirstNameFilter}
                LastNameFilter={formData.LastNameFilter}
                ProfileLanguageFilter={formData.ProfileLanguageFilter}
                YearsOfExperienceFilter={formData.YearsOfExperienceFilter}
                GroupsFilter={formData.GroupsFilter}
                SchoolFilter={formData.SchoolFilter}
                ChangedJobsFilter={formData.ChangedJobsFilter}
                PostedOnLinkedInFilter={formData.PostedOnLinkedInFilter}
                handleFormChange={handleFormChange}
                campaignID={campaignID}
              />
            )}
            {activeStep === 3 && (
              <EditLinkedInSubjectAndMessageForm
                Subject={formData.Subject}
                Message={formData.Message}
                Variant={formData.Variant}
                handleFormChange={handleFormChange}
                campaignID={campaignID}
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
                {activeStep === steps.length - 1 ? "Edit campaign" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
    </Modal>
  );
};

export default EditLinkedInModal;
