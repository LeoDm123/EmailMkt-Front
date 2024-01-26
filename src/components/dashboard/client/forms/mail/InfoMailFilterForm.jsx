import React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import serverAPI from "../../../../../api/serverAPI";

const AddMailFilterForm = ({ campaignID }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchMailCampaignsByID = async () => {
      try {
        const resp = await serverAPI.get(
          `/mails/fetchMailCampaignsByID/${campaignID}`
        );
        const campaignData = resp.data;

        setFormData({
          "Campaign Name": campaignData.mailCampaignName,
          Name: campaignData.mailCampaignFilters[0]?.Name,
          "# of Employees": campaignData.mailCampaignFilters[1]?.EmployeesNr,
          "Job Title": campaignData.mailCampaignFilters[2]?.JobTitles,
          Industry: campaignData.mailCampaignFilters[3]?.Industries,
          "Company Name": campaignData.mailCampaignFilters[4]?.CompanyName,
          Keywords: campaignData.mailCampaignFilters[5]?.Keywords,
          Revenue: campaignData.mailCampaignFilters[6]?.Revenue,
          Department: campaignData.mailCampaignFilters[7]?.Department,
          Location: campaignData.mailCampaignFilters[8]?.Location,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMailCampaignsByID();
  }, [campaignID]);

  return (
    <Grid sx={{ height: "70%" }}>
      <Grid container spacing={2}>
        {Object.entries(formData).map(([key, value], index) => (
          <Grid item xs={12} sm={6} key={key}>
            <TextField fullWidth label={key} variant="outlined" value={value} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default AddMailFilterForm;
