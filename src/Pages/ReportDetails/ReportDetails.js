import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, Divider, Typography } from "@mui/material";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useState, useContext } from "react";
import CommonTable from "../../UI/CommonTable";
import { uiContext } from "../../App";
import axios from "axios";
const ReportDetails = (props) => {
  const handeLoading = useContext(uiContext);
  const { reportInfo } = useParams();
  const reportDetails = reportInfo.split("-");
  const [rows, setRows] = useState([]);
  const [sheet, setSheet] = useState("");
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const columns = [
    { id: "cve", label: "CVE", minWidth: "15%" },
    { id: "title", label: "Title", minWidth: "20%" },
    { id: "componentName", label: "Component Name", minWidth: "20%" },
    { id: "componentType", label: "Component Type", minWidth: "20%" },
    { id: "severity", label: "Severity", minWidth: "20%" },
  ];
  const buttonStyle = {
    bgcolor: "#fd7e14",
    ml: 10,
    mt: 4,
    color: "black",
    borderRadius: 1,
    width: 200,
    boxShadow: 1,
    textTransform: "none",
  };
  const tableStyle = { width: "89%", overflow: "hidden", ml: 10, mt: 6 };
  const containerStyle = { height: "750px" };
  useDeepCompareEffect(() => {
    const fetchRows = async () => {
      handeLoading(true);
      await props.container.items
        .query(
          `SELECT c.google_sheet_id,c.vulnerabilities FROM c WHERE c.reportID = ${reportDetails[2]} AND c.id="${reportDetails[0]}-${reportDetails[1]}"`
        )
        .fetchAll()
        .then((response) => {
          let count = 0;
          const issues = [];
          if (response.resources[0].hasOwnProperty("google_sheet_id")) {
            setSheet(response.resources[0].google_sheet_id);
          }
          setVulnerabilities(response.resources[0].vulnerabilities);
          response.resources[0].vulnerabilities.forEach((item) => {
            const row = {
              id: item.cve + `${count}`,
              title: item.title,
              cve: item.cve,
              componentName: item.component_name,
              componentType: item.component_type,
              severity: item.severity,
            };
            count++;
            issues.push(row);
          });
          setRows(issues);
          handeLoading(false);
        });
    };

    if (Object.keys(props.container).length !== 0) {
      fetchRows();
    }
  }, [props.container]);

  const createSheet = () => {
    var options = {
      method: "POST",
      url: "https://sts.choreo.dev/oauth2/token",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: "xj4x8M6lh82q8wtyyPsKbq8Iw4Ma",
        client_secret: "Jdf7P6OGKk4xmXOf0G_AMZcvWw8a",
        audience: "openId",
      }),
    };

    axios
      .request(options)
      .then(function (response) {
        const params = new URLSearchParams({
          sheetName: reportInfo,
        });
        var createSheetOptions = {
          method: "POST",
          url: `https://07f7a019-eb0c-47b3-8999-078f2a9b9de6-dev.e1-us-east-azure.choreoapis.dev/rueo/sheetshandler/1.0.0/createSheet?${params}`,
          headers: {
            "content-type": "application/json",
            Authorization: `bearer ${response.data.access_token}`,
          },
          data: vulnerabilities,
        };
        axios.request(createSheetOptions).then(async (response) => {
          var operations = [];
          operations.push({
            op: "add",
            path: "/google_sheet_id",
            value: response.data,
          });
          await props.container
            .item(
              `${reportDetails[0]}-${reportDetails[1]}`,
              Number(reportDetails[2])
            )
            .patch(operations)
            .then((response) => {
              setSheet(Object.resource.google_sheet_id);
            });
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  //https://vms-db-westus.documents.azure.com/dbs/vmsDB/colls/vmsContainer/docs/wso2mi-1.1.1
  return (
    <Box sx={{ position: "absolute", width: "85%", left: 0, ml: "14%" }}>
      <Box className="header">
        <Typography sx={{ ml: 10, mt: 2, fontSize: 35 }}>
          {reportInfo}
        </Typography>
      </Box>
      <Divider sx={{ width: "101%", pb: 2.5 }} />
      {sheet !== "" && (
        <Button sx={buttonStyle} onClick={()=>window.open(sheet)}>
          Open report
        </Button>
      )}
      {sheet === "" && (
        <Button sx={buttonStyle} onClick={createSheet}>
          Create report
        </Button>
      )}
      <CommonTable
        rows={rows}
        columns={columns}
        tableStyle={tableStyle}
        height={587}
        cellStyle={{ p: "10px 10px 10px 15px" }}
        containerStyle={containerStyle}
      />
    </Box>
  );
};
export default ReportDetails;
