import React from "react";
import { useEffect, useState } from "react";
import serverAPI from "../../../../../api/serverAPI";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteButton from "../../../../DeleteButton";
import swal from "sweetalert";
import { DividerTitle } from "../../../../Dividers";
import AddButton from "../../../../AddButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const EditMailSubjectAndMessageAdminForm = ({
  handleFormChange,
  campaignID,
}) => {
  const [stages, setStages] = useState([
    { Subject: "", Message: "", Variants: [] },
  ]);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    const fetchMailCampaignsByID = async () => {
      try {
        const resp = await serverAPI.get(
          `/mails/fetchMailCampaignsByID/${campaignID}`
        );
        const campaignData = resp.data;

        const { mailCampaignSubjectAndMessage } = campaignData;
        const Stages = mailCampaignSubjectAndMessage[0]?.Stages || [];

        const stagesData = Stages.map((stage) => ({
          Subject: stage.Subject,
          Message: stage.Message,
          Variants: stage.Variants || [],
        }));

        setStages(stagesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMailCampaignsByID();
  }, [campaignID]);

  const handleAddStage = () => {
    setStages([...stages, { Subject: "", Message: "", Variants: [] }]);
  };

  const handleVariantsChange = (stageIndex, variantIndex, variant, value) => {
    const newStages = [...stages];
    newStages[stageIndex].Variants[variantIndex][variant] = value;
    setStages(newStages);
    handleFormChange("Stages", newStages);
  };

  const handleDeleteStage = (index) => {
    const newStages = [...stages];
    newStages.splice(index, 1);
    setStages(newStages);
    setCurrentTab(Math.min(currentTab, newStages.length - 1));
    handleFormChange("Stages", newStages);
  };

  const handleAddVariant = (stageIndex) => {
    const newStages = [...stages];
    newStages[stageIndex].Variants.push({
      Subject: "",
      Message: "",
      DaysToStart: "",
    });
    setStages(newStages);
    handleFormChange("Stages", newStages);
  };

  const handleDeleteVariant = (stageIndex, variantIndex) => {
    const newStages = [...stages];
    newStages[stageIndex].Variants.splice(variantIndex, 1);
    setStages(newStages);
    handleFormChange("Stages", newStages);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleStageChange = (field, value) => {
    const newStages = [...stages];
    newStages[currentTab][field] = value;
    setStages(newStages);
    handleFormChange("Stages", newStages);
  };

  const deleteStage = (currentTab) => {
    swal({
      title: "¿Do you wish to delete the current stage?",
      text: "Once deleted, it cannot be recovered",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        handleDeleteStage(currentTab);
      }
    });
  };

  const deleteVariant = (currentTab, variantIndex) => {
    swal({
      title: "¿Do you wish to delete the current variant?",
      text: "Once deleted, it cannot be recovered",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        handleDeleteVariant(currentTab, variantIndex);
      }
    });
  };

  return (
    <form id="messageForm" style={{ height: "70%" }}>
      <Grid>
        <Grid
          xs={12}
          className="d-flex justify-content-between align-items-center"
        >
          <Tabs value={currentTab} onChange={handleTabChange}>
            {stages.map((stage, index) => (
              <Tab key={index} label={`Stage ${index + 1}`} />
            ))}
          </Tabs>
          <Grid className="d-flex justify-content-between align-items-center">
            <AddButton onClick={handleAddStage} />
            {stages.length > 1 && (
              <DeleteButton onDelete={() => deleteStage(currentTab)} />
            )}
          </Grid>
        </Grid>
        <Grid
          sx={{
            marginBottom: 2,
            height: 450,
            overflow: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "dark",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "lightgray",
              borderRadius: "5px",
            },
          }}
        >
          <Grid xs={12} className="mt-3 mb-1">
            <TextField
              fullWidth
              label="Subject"
              variant="outlined"
              value={stages[currentTab]?.Subject}
              onChange={(e) => handleStageChange("Subject", e.target.value)}
            />
          </Grid>
          <Grid xs={12} className="mt-3 mb-1">
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              multiline
              minRows={5}
              value={stages[currentTab]?.Message}
              onChange={(e) => handleStageChange("Message", e.target.value)}
            />
          </Grid>
          {stages[currentTab].Variants.map((variant, variantIndex) => (
            <React.Fragment key={variantIndex}>
              <Grid sx={{ padding: 2 }}>
                <DividerTitle />
              </Grid>
              <Grid className="d-flex justify-content-between align-items-center my-2">
                <TextField
                  fullWidth
                  label={`Variant ${variantIndex + 1} - Subject`}
                  variant="outlined"
                  value={variant?.Subject}
                  onChange={(e) =>
                    handleVariantsChange(
                      currentTab,
                      variantIndex,
                      "Subject",
                      e.target.value
                    )
                  }
                />
                <TextField
                  fullWidth
                  className="mx-2 w-25"
                  label={`Days To Start`}
                  variant="outlined"
                  value={variant?.DaysToStart}
                  onChange={(e) =>
                    handleVariantsChange(
                      currentTab,
                      variantIndex,
                      "DaysToStart",
                      e.target.value
                    )
                  }
                />

                <Grid>
                  <DeleteButton
                    onDelete={() => deleteVariant(currentTab, variantIndex)}
                  />
                </Grid>
              </Grid>
              <Grid xs={12} sx={{ marginY: 2 }}>
                <TextField
                  fullWidth
                  label={`Variant ${variantIndex + 1} - Message`}
                  variant="outlined"
                  multiline
                  minRows={5}
                  value={variant?.Message}
                  onChange={(e) =>
                    handleVariantsChange(
                      currentTab,
                      variantIndex,
                      "Message",
                      e.target.value
                    )
                  }
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddVariant(currentTab)}
        >
          Add Variant
        </Button>
      </Grid>
    </form>
  );
};

export default EditMailSubjectAndMessageAdminForm;
