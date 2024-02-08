import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import serverAPI from "../../../../../api/serverAPI";
import { DividerTitle } from "../../../../Dividers";

const InfoMailSubjectAndMessageForm = ({ campaignID }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchMailCampaignsByID = async () => {
      try {
        const resp = await serverAPI.get(
          `/mails/fetchMailCampaignsByID/${campaignID}`
        );
        const campaignData = resp.data;

        const { mailCampaignSubjectAndMessage } = campaignData;
        const mainSubject = mailCampaignSubjectAndMessage[0]?.Subject;
        const mainMessage = mailCampaignSubjectAndMessage[1]?.Message;
        const variants = mailCampaignSubjectAndMessage[2]?.Variant || [];

        const variantData = variants.map((variant) => ({
          Subject: variant.Subject,
          Message: variant.Message,
          DaysToStart: variant.DaysToStart,
        }));

        setFormData({
          Subject: mainSubject,
          Message: mainMessage,
          Variants: variantData,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMailCampaignsByID();
  }, [campaignID]);

  return (
    <Grid sx={{ height: "70%" }}>
      <Grid
        sx={{
          marginBottom: 2,
          height: 500,
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
        <Grid xs={12} sm={12}>
          <TextField
            fullWidth
            label="Subject"
            variant="outlined"
            value={formData.Subject || ""}
            sx={{ marginY: 2 }}
          />
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            multiline
            rows={5}
            value={formData.Message || ""}
          />
        </Grid>

        {formData.Variants?.map((variant, idx) => (
          <Grid item xs={12} sm={12} key={idx}>
            <React.Fragment>
              <Grid sx={{ margin: 2 }}>
                <DividerTitle />
              </Grid>
              <Grid className="d-flex justify-content-between align-items-center ">
                <TextField
                  sx={{ marginY: 1, marginRight: 1 }}
                  fullWidth
                  label={`Variant ${idx + 1} Subject`}
                  variant="outlined"
                  value={variant.Subject}
                />
                <TextField
                  sx={{ marginY: 1, width: "15%" }}
                  fullWidth
                  label={"Days to start"}
                  variant="outlined"
                  value={variant.DaysToStart}
                />
              </Grid>
              <TextField
                sx={{ marginY: 1 }}
                fullWidth
                label={`Variant ${idx + 1} Message`}
                variant="outlined"
                value={variant.Message}
              />
            </React.Fragment>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default InfoMailSubjectAndMessageForm;
