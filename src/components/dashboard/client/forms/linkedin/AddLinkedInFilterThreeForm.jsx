import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Title from "../../../../Title";

const AddLinkedInFilterThreeForm = ({ formData, handleFormChange }) => {
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
            value={formData.GeographyFilter}
            onChange={(e) =>
              handleFormChange("GeographyFilter", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Industry"
            variant="outlined"
            className="mt-2 ms-2"
            value={formData.IndustryFilter}
            onChange={(e) => handleFormChange("IndustryFilter", e.target.value)}
          />
        </Grid>

        <Grid className="d-flex flex-direction-row">
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            className="mt-3 me-2"
            value={formData.FirstNameFilter}
            onChange={(e) =>
              handleFormChange("FirstNameFilter", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            className="mt-3 ms-2"
            value={formData.LastNameFilter}
            onChange={(e) => handleFormChange("LastNameFilter", e.target.value)}
          />
        </Grid>

        <Grid className="d-flex flex-direction-row">
          <TextField
            fullWidth
            label="Profile Language"
            variant="outlined"
            className="mt-3 me-2"
            value={formData.ProfileLanguageFilter}
            onChange={(e) =>
              handleFormChange("ProfileLanguageFilter", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Years of Experience"
            variant="outlined"
            className="mt-3 ms-2"
            value={formData.YearsOfExperienceFilter}
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
            value={formData.GroupsFilter}
            onChange={(e) => handleFormChange("GroupsFilter", e.target.value)}
          />

          <TextField
            fullWidth
            label="School"
            variant="outlined"
            className="mt-3 ms-2 mb-4"
            value={formData.SchoolFilter}
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
            value={formData.ChangedJobsFilter}
            onChange={(e) =>
              handleFormChange("ChangedJobsFilter", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Posted on LinkedIn"
            variant="outlined"
            className="mt-2 ms-2"
            value={formData.PostedOnLinkedInFilter}
            onChange={(e) =>
              handleFormChange("PostedOnLinkedInFilter", e.target.value)
            }
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default AddLinkedInFilterThreeForm;
