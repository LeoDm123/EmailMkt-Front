import jsPDF from "jspdf";
import serverAPI from "../../api/serverAPI";

const exportToPDF = async ({ campaignID }) => {
  const pdf = new jsPDF();

  try {
    const resp = await serverAPI.get(
      `/linkedin/fetchLinkedInCampaignsByID/${campaignID}`
    );
    const campaignData = resp.data;

    campaignData.forEach((campaign, index) => {
      pdf.text(`Campaign ${index + 1}:`, 10, (index + 1) * 20);
      pdf.text(
        `  Name: ${campaign.linkedInCampaignName}`,
        20,
        (index + 1) * 20 + 10
      );
      pdf.text(`  Date: ${campaign.date}`, 20, (index + 1) * 20 + 20);
      pdf.text(`  User: ${campaign.user}`, 20, (index + 1) * 20 + 30);
      pdf.text(`  Status: ${campaign.status}`, 20, (index + 1) * 20 + 40);
    });

    pdf.save("LinkedInCampaigns.pdf");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default exportToPDF;
