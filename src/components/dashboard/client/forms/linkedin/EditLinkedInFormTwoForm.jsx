import React from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Title from "../../../../Title";
import serverAPI from "../../../../../api/serverAPI";

const EditLinkedInFilterTwoForm = ({
  RoleFunctionFilter,
  CurrentJobTitleFilter,
  SeniorityLevelFilter,
  PastJobTitleFilter,
  YearsInCurrentCompanyFilter,
  YearsInCurrentPositionFilter,
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

        handleFormChange(
          "RoleFunctionFilter",
          campaignData.linkedInCampaignFilters[5]?.RoleFunction
        );
        handleFormChange(
          "CurrentJobTitleFilter",
          campaignData.linkedInCampaignFilters[6]?.CurrentJobTitle
        );
        handleFormChange(
          "SeniorityLevelFilter",
          campaignData.linkedInCampaignFilters[7]?.SeniorityLevel
        );
        handleFormChange(
          "PastJobTitleFilter",
          campaignData.linkedInCampaignFilters[8]?.PastJobTitle
        );
        handleFormChange(
          "YearsInCurrentCompanyFilter",
          campaignData.linkedInCampaignFilters[9]?.YearsInCurrentCompany
        );
        handleFormChange(
          "YearsInCurrentPositionFilter",
          campaignData.linkedInCampaignFilters[10]?.YearsInCurrentPosition
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLinkedInCampaignsByID();
  }, [campaignID]);

  return (
    <form id="registerForm" style={{ height: "70%" }}>
      <Grid>
        <Title>Role</Title>
        <Grid className="w-100 d-flex flex-direction-row">
          <TextField
            fullWidth
            label="Function"
            variant="outlined"
            className="mt-2 me-2"
            value={RoleFunctionFilter}
            onChange={(e) =>
              handleFormChange("RoleFunctionFilter", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Current Job Title"
            variant="outlined"
            className="mt-2 ms-2"
            value={CurrentJobTitleFilter}
            onChange={(e) =>
              handleFormChange("CurrentJobTitleFilter", e.target.value)
            }
          />
        </Grid>

        <Grid className="d-flex flex-direction-row">
          <TextField
            fullWidth
            label="Seniority Level"
            variant="outlined"
            className="mt-3 me-2"
            value={SeniorityLevelFilter}
            onChange={(e) =>
              handleFormChange("SeniorityLevelFilter", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Past Job Title"
            variant="outlined"
            className="mt-3 ms-2"
            value={PastJobTitleFilter}
            onChange={(e) =>
              handleFormChange("PastJobTitleFilter", e.target.value)
            }
          />
        </Grid>

        <Grid className="d-flex flex-direction-row">
          <TextField
            fullWidth
            label="Years in Current Company"
            variant="outlined"
            className="mt-3 me-2"
            value={YearsInCurrentCompanyFilter}
            onChange={(e) =>
              handleFormChange("YearsInCurrentCompanyFilter", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Years in Current Position"
            variant="outlined"
            className="mt-3 ms-2"
            value={YearsInCurrentPositionFilter}
            onChange={(e) =>
              handleFormChange("YearsInCurrentPositionFilter", e.target.value)
            }
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default EditLinkedInFilterTwoForm;
