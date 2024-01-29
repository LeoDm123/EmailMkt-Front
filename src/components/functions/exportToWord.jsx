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
