import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import PrintIcon from "@mui/icons-material/Print";
import IconButton from "@mui/material/IconButton";

const exportToWord = () => {
  const doc = new Document();

  linkedInCampaigns.forEach((campaign, index) => {
    doc.addParagraph(new Paragraph(`Campaign ${index + 1}:`));
    doc.addParagraph(
      new Paragraph().addRun(
        new TextRun(`  Name: ${campaign.linkedInCampaignName}`)
      )
    );
    doc.addParagraph(
      new Paragraph().addRun(new TextRun(`  Date: ${campaign.date}`))
    );
    doc.addParagraph(
      new Paragraph().addRun(new TextRun(`  User: ${campaign.user}`))
    );
    doc.addParagraph(
      new Paragraph().addRun(new TextRun(`  Status: ${campaign.status}`))
    );
  });

  Packer.toBuffer(doc).then((buffer) => {
    saveAs(
      new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }),
      "LinkedInCampaigns.docx"
    );
  });
};

const exportToPDF = () => {
  const pdf = new jsPDF();

  linkedInCampaigns.forEach((campaign, index) => {
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
};

const PrintButton = () => {
  return (
    <div>
      <ButtonGroup variant="outlined" aria-label="delete">
        <IconButton>
          <PrintIcon />
        </IconButton>
      </ButtonGroup>
    </div>
  );
};

export default PrintButton;
