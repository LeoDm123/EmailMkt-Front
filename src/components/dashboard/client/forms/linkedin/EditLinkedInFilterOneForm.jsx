import React from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Title from "../../../../Title";
import serverAPI from "../../../../../api/serverAPI";

const EditLinkedInFilterOneForm = ({
  CampaignTitle,
  CurrentCompanyNameFilter,
  CompanyHeadcountFilter,
  PastCompanyNameFilter,
  CompanyTypeFilter,
  CompanyHQLocationFilter,
  campaignID,
  handleFormChange,
}) => {
  useEffect(() => {
    const fetchLinkedInCampaignsByID = async () => {
      try {
        console.log(campaignID);
        const resp = await serverAPI.get(
          `/linkedin/fetchLinkedInCampaignsByID/${campaignID}`
        );
        const campaignData = resp.data;
        console.log(campaignData);

        handleFormChange("CampaignTitle", campaignData.linkedInCampaignName);
        handleFormChange(
          "CurrentCompanyNameFilter",
          campaignData.linkedInCampaignFilters[0]?.CurrentCompanyName
        );
        handleFormChange(
          "CompanyHeadcountFilter",
          campaignData.linkedInCampaignFilters[1]?.CompanyHeadcount
        );
        handleFormChange(
          "PastCompanyNameFilter",
          campaignData.linkedInCampaignFilters[2]?.PastCompanyName
        );
        handleFormChange(
          "CompanyTypeFilter",
          campaignData.linkedInCampaignFilters[3]?.CompanyType
        );
        handleFormChange(
          "CompanyHQLocationFilter",
          campaignData.linkedInCampaignFilters[4]?.CompanyHQLocation
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLinkedInCampaignsByID();
  }, [campaignID]);

  return (
    <form id="registerForm" style={{ height: "70%" }}>
      <Grid className="w-100 me-3 mb-3">
        <TextField
          fullWidth
          label="Campaign Title"
          variant="outlined"
          value={CampaignTitle}
          onChange={(e) => handleFormChange("CampaignTitle", e.target.value)}
        />
      </Grid>

      <Grid>
        <Title>Company</Title>
        <Grid className="w-100 d-flex flex-direction-row">
          <TextField
            fullWidth
            label="Current Company"
            variant="outlined"
            className="mt-2 me-2"
            value={CurrentCompanyNameFilter}
            onChange={(e) =>
              handleFormChange("CurrentCompanyNameFilter", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Company Headcount"
            variant="outlined"
            className="mt-2 ms-2"
            value={CompanyHeadcountFilter}
            onChange={(e) =>
              handleFormChange("CompanyHeadcountFilter", e.target.value)
            }
          />
        </Grid>

        <Grid className="d-flex flex-direction-row">
          <TextField
            fullWidth
            label="Past Company"
            variant="outlined"
            className="mt-3 me-2"
            value={PastCompanyNameFilter}
            onChange={(e) =>
              handleFormChange("PastCompanyNameFilter", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Company Type"
            variant="outlined"
            className="mt-3 ms-2"
            value={CompanyTypeFilter}
            onChange={(e) =>
              handleFormChange("CompanyTypeFilter", e.target.value)
            }
          />
        </Grid>

        <Grid>
          <TextField
            fullWidth
            label="Company Headquarters Location"
            variant="outlined"
            className="mt-3 w-100"
            value={CompanyHQLocationFilter}
            onChange={(e) =>
              handleFormChange("CompanyHQLocationFilter", e.target.value)
            }
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default EditLinkedInFilterOneForm;
