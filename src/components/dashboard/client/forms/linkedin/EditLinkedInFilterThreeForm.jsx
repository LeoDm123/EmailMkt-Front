import React from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Title from "../../../../Title";
import serverAPI from "../../../../../api/serverAPI";

const EditLinkedInFilterThreeForm = ({
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
  campaignID,
  handleFormChange,
}) => {
  useEffect(() => {
    const fetchLinkedInCampaignsByID = async () => {
      try {
        campaignID;
        const resp = await serverAPI.get(
          `/linkedin/fetchLinkedInCampaignsByID/${campaignID}`
        );
        const campaignData = resp.data;

        handleFormChange(
          "GeographyFilter",
          campaignData.linkedInCampaignFilters[11]?.Geography
        );
        handleFormChange(
          "IndustryFilter",
          campaignData.linkedInCampaignFilters[12]?.Industry
        );
        handleFormChange(
          "FirstNameFilter",
          campaignData.linkedInCampaignFilters[13]?.FirstName
        );
        handleFormChange(
          "LastNameFilter",
          campaignData.linkedInCampaignFilters[14]?.LastName
        );
        handleFormChange(
          "ProfileLanguageFilter",
          campaignData.linkedInCampaignFilters[15]?.ProfileLanguage
        );
        handleFormChange(
          "YearsOfExperienceFilter",
          campaignData.linkedInCampaignFilters[16]?.YearsOfExperience
        );
        handleFormChange(
          "GroupsFilter",
          campaignData.linkedInCampaignFilters[17]?.Groups
        );
        handleFormChange(
          "SchoolFilter",
          campaignData.linkedInCampaignFilters[18]?.School
        );
        handleFormChange(
          "ChangedJobsFilter",
          campaignData.linkedInCampaignFilters[19]?.ChangedJobs
        );
        handleFormChange(
          "PostedOnLinkedInFilter",
          campaignData.linkedInCampaignFilters[20]?.PostedOnLinkedIn
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
        <Title>Personal</Title>
        <Grid className="w-100 d-flex flex-direction-row">
          <TextField
            fullWidth
            label="Geography"
            variant="outlined"
            className="mt-2 me-2"
            value={GeographyFilter}
            onChange={(e) =>
              handleFormChange("GeographyFilter", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Industry"
            variant="outlined"
            className="mt-2 ms-2"
            value={IndustryFilter}
            onChange={(e) => handleFormChange("IndustryFilter", e.target.value)}
          />
        </Grid>

        <Grid className="d-flex flex-direction-row">
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            className="mt-3 me-2"
            value={FirstNameFilter}
            onChange={(e) =>
              handleFormChange("FirstNameFilter", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            className="mt-3 ms-2"
            value={LastNameFilter}
            onChange={(e) => handleFormChange("LastNameFilter", e.target.value)}
          />
        </Grid>

        <Grid className="d-flex flex-direction-row">
          <TextField
            fullWidth
            label="Profile Language"
            variant="outlined"
            className="mt-3 me-2"
            value={ProfileLanguageFilter}
            onChange={(e) =>
              handleFormChange("ProfileLanguageFilter", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Years of Experience"
            variant="outlined"
            className="mt-3 ms-2"
            value={YearsOfExperienceFilter}
            onChange={(e) =>
              handleFormChange("YearsOfExperienceFilter", e.target.value)
            }
          />
        </Grid>

        <Grid className="d-flex flex-direction-row">
          <TextField
            fullWidth
            label="Groups (Mandatoty Field)"
            variant="outlined"
            className="mt-3 me-2 mb-4"
            value={GroupsFilter}
            onChange={(e) => handleFormChange("GroupsFilter", e.target.value)}
          />

          <TextField
            fullWidth
            label="School"
            variant="outlined"
            className="mt-3 ms-2 mb-4"
            value={SchoolFilter}
            onChange={(e) => handleFormChange("SchoolFilter", e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid>
        <Title>Recent Updates</Title>
        <Grid className="w-100 d-flex flex-direction-row">
          <TextField
            fullWidth
            label="Changed Jobs"
            variant="outlined"
            className="mt-2 me-2"
            value={ChangedJobsFilter}
            onChange={(e) =>
              handleFormChange("ChangedJobsFilter", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Posted on LinkedIn"
            variant="outlined"
            className="mt-2 ms-2"
            value={PostedOnLinkedInFilter}
            onChange={(e) =>
              handleFormChange("PostedOnLinkedInFilter", e.target.value)
            }
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default EditLinkedInFilterThreeForm;
