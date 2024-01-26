import React from "react";
import { useEffect } from "react";
import serverAPI from "../../../../../api/serverAPI";
import PersonalSwitch from "../../../../Switch";

const EditMailOptionsAdminForm = ({
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
  handleFormChange,
  campaignID,
}) => {
  useEffect(() => {
    const fetchMailCampaignsByID = async () => {
      try {
        console.log(campaignID);
        const resp = await serverAPI.get(
          `/mails/fetchMailCampaignsByID/${campaignID}`
        );
        const campaignData = resp.data;

        handleFormChange("NoHtml", campaignData.mailCampaignOptions[0]?.NoHtml);
        handleFormChange(
          "RemoveContacts",
          campaignData.mailCampaignOptions[1]?.RemoveContacts
        );
        handleFormChange(
          "OnlyVerified",
          campaignData.mailCampaignOptions[2]?.OnlyVerified
        );
        handleFormChange(
          "CustomTracking",
          campaignData.mailCampaignOptions[3]?.CustomTracking
        );
        handleFormChange(
          "ABTesting",
          campaignData.mailCampaignOptions[4]?.ABTesting
        );
        handleFormChange(
          "RequestCurrentJob",
          campaignData.mailCampaignOptions[5]?.RequestCurrentJob
        );
        handleFormChange(
          "RequestRecentNews",
          campaignData.mailCampaignOptions[6]?.RequestRecentNews
        );
        handleFormChange(
          "RequestCompanyMission",
          campaignData.mailCampaignOptions[7]?.RequestCompanyMission
        );
        handleFormChange(
          "BasicWarming",
          campaignData.mailCampaignOptions[8]?.BasicWarming
        );
        handleFormChange(
          "AdvancedWarming",
          campaignData.mailCampaignOptions[9]?.AdvancedWarming
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMailCampaignsByID();
  }, [campaignID]);

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

export default EditMailOptionsAdminForm;
