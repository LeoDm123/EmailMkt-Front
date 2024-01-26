import React from "react";
import PersonalSwitch from "../../../../Switch";

const AddMailOptionsForm = ({ formData, handleFormChange }) => {
  const {
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
  } = formData;

  return (
    <form id="optionsForm" style={{ height: "70%" }}>
      <PersonalSwitch
        checked={NoHtml}
        onChange={() => handleFormChange("NoHtml", !NoHtml)}
        defaultChecked={false}
        label="No HTML"
      />
      <PersonalSwitch
        checked={RemoveContacts}
        onChange={() => handleFormChange("RemoveContacts", !RemoveContacts)}
        defaultChecked={false}
        label="Remove all contacts from the same company if reply"
      />
      <PersonalSwitch
        checked={OnlyVerified}
        onChange={() => handleFormChange("OnlyVerified", !OnlyVerified)}
        defaultChecked={false}
        label="Use only “verified” emails, “unknown” emails, or all “emails” (not advised)"
      />
      <PersonalSwitch
        checked={CustomTracking}
        onChange={() => handleFormChange("CustomTracking", !CustomTracking)}
        defaultChecked={false}
        label="Custom Tracking Domains"
      />
      <PersonalSwitch
        checked={ABTesting}
        onChange={() => handleFormChange("ABTesting", !ABTesting)}
        defaultChecked={false}
        label="A|B Testing Optimization"
      />
      <PersonalSwitch
        checked={RequestCurrentJob}
        onChange={() =>
          handleFormChange("RequestCurrentJob", !RequestCurrentJob)
        }
        defaultChecked={false}
        label="Request Personalization - Current Job Posting"
      />
      <PersonalSwitch
        checked={RequestRecentNews}
        onChange={() =>
          handleFormChange("RequestRecentNews", !RequestRecentNews)
        }
        defaultChecked={false}
        label="Request Personalization - Recent News Coverage"
      />
      <PersonalSwitch
        checked={RequestCompanyMission}
        onChange={() =>
          handleFormChange("RequestCompanyMission", !RequestCompanyMission)
        }
        defaultChecked={false}
        label="Request Personalization - Company Mission Statement"
      />
      <PersonalSwitch
        checked={BasicWarming}
        onChange={() => handleFormChange("BasicWarming", !BasicWarming)}
        defaultChecked={false}
        label="Basic Warming (Note: 2 week warm time)"
      />
      <PersonalSwitch
        checked={AdvancedWarming}
        onChange={() => handleFormChange("AdvancedWarming", !AdvancedWarming)}
        defaultChecked={false}
        label="Advanced Warming (Note: 4 weeks warm time)"
      />
    </form>
  );
};

export default AddMailOptionsForm;
