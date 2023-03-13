import {
  Button,
  Divider,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Details from "./Components/Details";
import ReportTable from "./Components/ReportTable";
import useDeepCompareEffect from "use-deep-compare-effect";
import UploadReport from "./Components/UploadReport";
import { uiContext } from "../../App";
import UpdateProject from "./Components/UpdateProject";

const ProjectDetails = (props) => {
  const handleLoading = useContext(uiContext);
  const { projectTitle } = useParams();
  const [reportData, setReportData] = useState([]);
  const [description, setDescription] = useState("");
  const [refresh, setRefresh] = useState(true);
  useDeepCompareEffect(() => {
    const fetchRows = async () => {
      handleLoading(true);
      props.container.items
        .query(
          `SELECT ARRAY_LENGTH(c.vulnerabilities),c.asset_description,c.created_date,c.scanner_type,c.team,c.tags,c.scanner_name,c.status_changed_on,c.reportID from c WHERE c.id="${projectTitle}"`
        )
        .fetchAll()
        .then((response) => {
          const rowArr = [];
          if (response.resources[0].asset_description !== undefined) {
            setDescription(response.resources[0].asset_description);
          }
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
          setRefresh(false);
        });
    };
    if (Object.keys(props.container).length !== 0 && refresh) {
      fetchRows();
    }
  }, [props.container, refresh]);

  const updateProject = (newValue, fieldName) => {
    handleLoading(true)
    const assetInfo = projectTitle.split("-");
    var operations = [];
    if (fieldName === "asset_version") {
      operations.push({ op: "replace", path:`/id`, value: (assetInfo[0]+"-"+newValue)});
    }
    if (fieldName === "asset") {
      operations.push({ op: "replace", path:`/id`, value: (newValue+"-"+assetInfo[0])});
    }
    operations.push({ op: "replace", path:`/${fieldName}`, value: newValue });
    reportData.forEach(async (item) => {
      await props.container
        .item(projectTitle, item.reportId)
        .patch(operations)
        .then((response) => {
          setRefresh(true);
          handleLoading(false);
        }).catch((e)=>{
          console.log(e);
        })
    });
  };

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
      <Box sx={{ display: "flex", ml: 10, mt: 2 }}>
        <Typography sx={{ fontSize: 35 }}>{projectTitle}</Typography>
        <UpdateProject
          title={projectTitle}
          description={description}
          handleRefresh={setRefresh}
          handleUpdate={updateProject}
        />
      </Box>
      <Divider sx={{ width: "101%", pb: 2.5 }} />
      <Box sx={{ display: "flex", width: "100%" }}>
        <Typography sx={{ fontSize: 25, ml: 9, mt: 7 }}>Overview</Typography>
        <UploadReport
          title={projectTitle}
          description={description}
          handleRefresh={setRefresh}
        />
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
          <Details reportData={reportData} description={description} />
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
