import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Divider, Typography } from "@mui/material";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useState,useContext } from "react";
import CommonTable from "../../UI/CommonTable";
import { uiContext } from "../../App";
const ReportDetails = (props) => {
  const handeLoading = useContext(uiContext);
  const { reportInfo } = useParams();
  const reportDetails = reportInfo.split("-");
  const [rows,setRows]= useState([]);    
  const columns = [
    { id: "cve", label: "CVE", minWidth: "15%" },
    { id: "title", label: "Title", minWidth: "20%" },
    { id: "componentName", label: "Component Name", minWidth: "20%" },
    { id: "componentType", label: "Component Type", minWidth: "20%" },
    { id: "severity", label: "Severity", minWidth: "20%" },
  ];
  const tableStyle = { width: "89%", overflow: "hidden", ml: 10, mt: 6 };
  const containerStyle = {height:"750px"};
  useDeepCompareEffect(() => {
    const fetchRows = async () => {
      handeLoading(true);
      await props.container.items
        .query(
          `SELECT cx.title,cx.cve,cx.component_name,cx.component_version,cx.component_type,cx.severity FROM  c JOIN cx in c.vulnerabilities WHERE c.reportID = ${reportDetails[2]} AND c.id="${reportDetails[0]}-${reportDetails[1]}"`
        )
        .fetchAll().then((response)=>{
            let count=0;
            const issues =[];
            response.resources.forEach(item => {
                const row ={
                    id:item.cve+`${count}`,
                    title:item.title,
                    cve:item.cve,
                    componentName:item.component_name,
                    componentType:item.component_type,
                    severity:item.severity
                }
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
  return (
    <Box sx={{ position: "absolute", width: "85%", left: 0, ml: "14%" }}>
      <Box className="header">
        <Typography sx={{ ml: 10, mt: 2, fontSize: 35 }}>
          {reportInfo}
        </Typography>
      </Box>
      <Divider sx={{ width: "101%", pb: 2.5 }} />
      <CommonTable
      rows={rows}
      columns={columns}
      tableStyle={tableStyle}
      height={587}
      cellStyle ={{ p: "10px 10px 10px 15px" }}
      containerStyle = {containerStyle}
    />
    </Box>

  );
};
export default ReportDetails;
