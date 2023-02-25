import {
  Button,
  Divider,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState,useContext } from "react";
import { useParams } from "react-router-dom";
import Details from "./Components/Details";
import ReportTable from "./Components/ReportTable";
import useDeepCompareEffect from "use-deep-compare-effect";
import UploadReport from "./Components/UploadReport";
import { uiContext } from "../../App";

const ProjectDetails = (props) => {
  const handleLoading = useContext(uiContext);
  const { projectTitle } = useParams();
  const [reportData, setReportData] = useState([]);
  useDeepCompareEffect(() => {
    const fetchRows = async()=>{
      handleLoading(true);
      props.container.items
      .query(
        `SELECT ARRAY_LENGTH(c.vulnerabilities),c.created_date,c.scanner_type,c.team,c.tags,c.scanner_name,c.status_changed_on,c.reportID from c WHERE c.id="${projectTitle}"`
      )
      .fetchAll()
      .then((response) => {
        const rowArr = [];
        response.resources.forEach((item) => {
          const row = {
            id: projectTitle + "-" + item.reportID,
            reportId: item.reportID,
            scannerType: item.scanner_type,
            lastUpdated: item.status_changed_on,
            createdOn: item.created_date,
            issueCount: item.$1,
          };
          rowArr.push(row);
        });
        setReportData(rowArr);
        handleLoading(false);
      });

    }
    if (Object.keys(props.container).length !== 0) {
      fetchRows();
    }
  }, [props.container]);

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

  return (
    <Box sx={{ position: "absolute", width: "85%", left: 0, ml: "14%" }}>
      <Box>
        <Typography sx={{ ml: 10, mt: 2, fontSize: 35 }}>
          {projectTitle}
        </Typography>
      </Box>
      <Divider sx={{ width: "101%", pb: 2.5 }} />
      <Box sx={{display:"flex",width:"100%"}}>
        <Typography sx={{ fontSize: 25, ml: 9, mt: 7 }}>Overview</Typography>
        <UploadReport />
      </Box>
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
          <Box>
            <Box sx={{ display: "flex", ml: "75%", mt: 2 }}>
              <Typography sx={{ mt: 0.5, mr: 2, fontSize: 17 }}>
                Search
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                sx={{ width: "200px" }}
                inputProps={{
                  style: {
                    height: "15px",
                  },
                }}
              />
              <Select
                sx={{ width: "80px", height: "33px", fontSize: 10, ml: 1 }}
                value={"name"}
              >
                <MenuItem sx={{ fontSize: "10px" }} value={"name"}>
                  Name
                </MenuItem>
                <MenuItem sx={{ fontSize: "10px" }} value={"type"}>
                  Type
                </MenuItem>
              </Select>
            </Box>
            <ReportTable reportData={reportData} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProjectDetails;
