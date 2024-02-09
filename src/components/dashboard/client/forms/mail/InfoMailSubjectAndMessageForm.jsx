import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import serverAPI from "../../../../../api/serverAPI";
import { DividerTitle } from "../../../../Dividers";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const InfoMailSubjectAndMessageForm = ({ campaignID }) => {
  const [formData, setFormData] = useState({});
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

  return (
    <Grid>
      <Grid
        xs={12}
        className="d-flex justify-content-between align-items-center"
      >
        <Tabs
          value={currentTab}
          onChange={(event, newValue) => setCurrentTab(newValue)}
        >
          {stages.map((stage, index) => (
            <Tab key={index} label={`Stage ${index + 1}`} />
          ))}
        </Tabs>
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
            value={stages[currentTab]?.Subject || ""}
          />
        </Grid>

        <Grid xs={12} className="mt-3 mb-1">
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            multiline
            minRows={5}
            value={stages[currentTab]?.Message || ""}
          />
        </Grid>
        {stages[currentTab]?.Variants.map((variant, variantIndex) => (
          <React.Fragment key={variantIndex}>
            <Grid sx={{ padding: 2, marginY: 2 }}>
              <DividerTitle />
            </Grid>
            <Grid className="d-flex justify-content-between align-items-center my-1">
              <TextField
                fullWidth
                label={`Variant ${variantIndex + 1} - Subject`}
                variant="outlined"
                value={variant.Subject || ""}
              />
              <TextField
                fullWidth
                className="m-2 w-25"
                label={`Days To Start`}
                variant="outlined"
                value={variant.DaysToStart || ""}
              />
            </Grid>
            <Grid xs={12} sx={{ marginY: 2 }}>
              <TextField
                fullWidth
                label={`Variant ${variantIndex + 1} - Message`}
                variant="outlined"
                multiline
                minRows={5}
                value={variant.Message || ""}
              />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Grid>
  );
};

export default InfoMailSubjectAndMessageForm;
