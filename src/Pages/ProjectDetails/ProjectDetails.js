import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Details from "./Components/Details";
import ReportTable from "./Components/ReportTable";

const ProjectDetails = () => {
  const { projectTitle } = useParams();
  const [render, setRender] = useState("Details");
  const [buttonColor, setButtonColor] = useState({
    Details: "#fd7e14",
    Reports: "#ffffff",
  });
  const handleClick = (event) => {
    if (event.target.value === "Details") {
      setButtonColor({
        Details: "#fd7e14",
        Reports: "#ffffff",
      });
    } else {
      setButtonColor({
        Details: "#ffffff",
        Reports: "#fd7e14",
      });
    }
    setRender(event.target.value);
  };
  const reportData = [
    {
      name: "report 1",
      type: "static",
      createdOn: "20-20-20",
      lastUpdated: "20-20-20",
      status: "pending",
    },
    {
      name: "report 2",
      type: "static",
      createdOn: "20-20-20",
      lastUpdated: "20-20-20",
      status: "pending",
    },
    {
      name: "report 3",
      type: "static",
      createdOn: "20-20-20",
      lastUpdated: "20-20-20",
      status: "pending",
    },
    {
      name: "report 4",
      type: "static",
      createdOn: "20-20-20",
      lastUpdated: "20-20-20",
      status: "pending",
    },
    {
      name: "report 5",
      type: "static",
      createdOn: "20-20-20",
      lastUpdated: "20-20-20",
      status: "pending",
    },
    {
      name: "report 6",
      type: "static",
      createdOn: "20-20-20",
      lastUpdated: "20-20-20",
      status: "pending",
    },
    {
      name: "report 7",
      type: "static",
      createdOn: "20-20-20",
      lastUpdated: "20-20-20",
      status: "pending",
    },
  ];

  return (
    <Box sx={{ position: "absolute", width: "85%", left: 0, ml: "14%" }}>
      <Box className="header">
        <Typography sx={{ ml: 10, mt: 2, fontSize: 35 }}>
          {projectTitle}
        </Typography>
      </Box>
      <Divider sx={{ width: "101%", pb: 2.5 }} />
      <Typography sx={{ fontSize: 25, ml: 9, mt: 7 }}>Overview</Typography>
      <Box
        sx={{
          width: "90%",
          ml: 9,
          mt: 3,
          border: "solid",
          borderWidth: 1,
          height: 700,
        }}
      >
        <Box>
          <Button
            sx={{
              textDecoration: "none",
              color: "black",
              backgroundColor: buttonColor.Details,
              borderRadius: 0,
            }}
            value={"Details"}
            onClick={handleClick}
          >
            Details
          </Button>
          <Button
            sx={{
              textDecoration: "none",
              color: "black",
              backgroundColor: buttonColor.Reports,
              borderRadius: 0,
            }}
            value={"Scan reports"}
            onClick={handleClick}
          >
            Scan Reports
          </Button>
        </Box>
        <Divider sx={{ width: "100%" }} />
        {render === "Details" ? (
          <Details reportData={reportData} />
        ) : (
          <ReportTable/>
        )}
      </Box>
    </Box>
  );
};

export default ProjectDetails;
