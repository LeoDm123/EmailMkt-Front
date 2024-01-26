import React from "react";
import { useState, useEffect } from "react";
import serverAPI from "../../../../api/serverAPI";
import PersonalSwitch from "../../../Switch";

const InfoMailOptionsForm = ({ campaignID }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchMailCampaignsByID = async () => {
      try {
        const resp = await serverAPI.get(
          `/mails/fetchMailCampaignsByID/${campaignID}`
        );
        const campaignData = resp.data[0];
        console.log(campaignData);

        setFormData({
          NoHtml: campaignData.mailCampaignOptions[0]?.NoHtml,
          RemoveContacts: campaignData.mailCampaignOptions[1]?.RemoveContacts,
          OnlyVerified: campaignData.mailCampaignOptions[2]?.OnlyVerified,
          CustomTracking: campaignData.mailCampaignOptions[3]?.CustomTracking,
          ABTesting: campaignData.mailCampaignOptions[4]?.ABTesting,
          RequestCurrentJob:
            campaignData.mailCampaignOptions[5]?.RequestCurrentJob,
          RequestRecentNews:
            campaignData.mailCampaignOptions[6]?.RequestRecentNews,
          RequestCompanyMission:
            campaignData.mailCampaignOptions[7]?.RequestCompanyMission,
          BasicWarming: campaignData.mailCampaignOptions[8]?.BasicWarming,
          AdvancedWarming: campaignData.mailCampaignOptions[9]?.AdvancedWarming,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMailCampaignsByID();
  }, [campaignID]);

  return (
    <form id="optionsForm" style={{ height: "70%" }}>
      <PersonalSwitch
        checked={formData.NoHtml}
        defaultChecked={false}
        label="No HTML"
      />
      <PersonalSwitch
        checked={formData.RemoveContacts}
        defaultChecked={false}
        label="Remove all contacts from the same company if reply"
      />
      <PersonalSwitch
        checked={formData.OnlyVerified}
        defaultChecked={false}
        label="Use only “verified” emails, “unknown” emails, or all “emails” (not advised)"
      />
      <PersonalSwitch
        checked={formData.CustomTracking}
        defaultChecked={false}
        label="Custom Tracking Domains"
      />
      <PersonalSwitch
        checked={formData.ABTesting}
        defaultChecked={false}
        label="A|B Testing Optimization"
      />
      <PersonalSwitch
        checked={formData.RequestCurrentJob}
        defaultChecked={false}
        label="Request Personalization - Current Job Posting"
      />
      <PersonalSwitch
        checked={formData.RequestRecentNews}
        defaultChecked={false}
        label="Request Personalization - Recent News Coverage"
      />
      <PersonalSwitch
        checked={formData.RequestCompanyMission}
        defaultChecked={false}
        label="Request Personalization - Company Mission Statement"
      />
      <PersonalSwitch
        checked={formData.BasicWarming}
        defaultChecked={false}
        label="Basic Warming (Note: 2 week warm time)"
      />
      <PersonalSwitch
        checked={formData.AdvancedWarming}
        defaultChecked={false}
        label="Advanced Warming (Note: 4 weeks warm time)"
        readOnly={true}
      />
    </form>
  );
};

export default InfoMailOptionsForm;
