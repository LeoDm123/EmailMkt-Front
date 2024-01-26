import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import swal from "sweetalert";
import Grid from "@mui/material/Grid";
import serverAPI from "../../../../../api/serverAPI";
import "../../../../../css/App.css";
import MailCampaignInfoButton from "../../buttons/mail/MailCampaignInfoButton";
import DeleteButton from "../../../../DeleteButton";
import EditMailCampaignButton from "../../buttons/mail/EditMailCampaignButton";

const MailCampaignsList = ({ onMailCreation }) => {
  const [mailCampaigns, setMailCampaigns] = useState([]);
  const [onMailDelete, setOnMailDelete] = useState(false);

  useEffect(() => {
    const fetchMailCampaigns = async () => {
      try {
        const response = await serverAPI.get("/mails/fetchMailCampaigns");
        const sortedCampaigns = response.data.slice();
        sortedCampaigns.sort((a, b) => {
          const CampaignA = a.mailCampaignName;
          const CampaignB = b.mailCampaignName;
          return CampaignA.localeCompare(CampaignB);
        });
        setMailCampaigns(sortedCampaigns);
      } catch (error) {
        console.error("Error :", error);
      }
    };

    fetchMailCampaigns();
  }, [onMailCreation, onMailDelete]);

  const deleteCampaign = async (campaignId) => {
    try {
      const deleteResp = await serverAPI.delete(
        `/mails/deleteMailCampaignByID/${campaignId}`
      );

      if (deleteResp.data.message === "Mail campaign deleted successfully") {
        SwAlertOk();
        handleCampaignDelete();
      } else {
        console.log("Operación de eliminación de pago fallida.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCampaignDelete = () => {
    setOnMailDelete(!onMailDelete);
  };

  const handleDeleteCampaign = (campaignId) => {
    swal({
      title: "¿Do you wish to delete this campaign?",
      text: "Once deleted, it cannot be recovered",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        console.log(campaignId);
        deleteCampaign(campaignId);
      }
    });
  };

  const SwAlertOk = () => {
    swal({
      title: "¡Success!",
      text: "Mail campaign deleted correctly",
      icon: "success",
    });
  };

  return (
    <Grid
      sx={{
        px: 1,
        pb: 1,
        mb: 1,
        display: "flex",
        flexDirection: "column",
        height: 540,
        overflow: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "dark",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "lightgray",
          borderRadius: "5px",
        },
      }}
    >
      <Table stickyHeader size="medium">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ backgroundColor: "#E1E3E1", width: "40%" }}
              className="text-center fw-bold"
            >
              Campaign Name
            </TableCell>
            <TableCell
              sx={{ backgroundColor: "#E1E3E1", width: "25%" }}
              className="text-center fw-bold"
            >
              Date
            </TableCell>
            <TableCell
              sx={{ backgroundColor: "#E1E3E1", width: "25%" }}
              className="text-center fw-bold"
            >
              Status
            </TableCell>
            <TableCell
              sx={{ backgroundColor: "#E1E3E1", width: "10%" }}
              className="text-center fw-bold"
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mailCampaigns.map((campaign, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell className="text-center">
                  {campaign.mailCampaignName}
                </TableCell>
                <TableCell className="text-center">{campaign.date}</TableCell>
                <TableCell className="text-center">{campaign.status}</TableCell>
                <TableCell>
                  <Grid className="d-flex align-items-center justify-content-center">
                    <MailCampaignInfoButton campaignID={campaign._id} />
                    <EditMailCampaignButton campaignID={campaign._id} />
                    <DeleteButton
                      onDelete={() => handleDeleteCampaign(campaign._id)}
                    />
                  </Grid>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
};

export default MailCampaignsList;
