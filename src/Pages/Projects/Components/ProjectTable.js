import * as React from "react";
import CommonTable from "../../../UI/CommonTable";
const columns = [
  { id: "asset", label: "Name", minWidth: "10%" },
  { id: "assetVersion", label: "Version", minWidth: "50%" },
  { id: "reportCount", label: "Report Count", minWidth: "20%" },
];

const ProjectTable = (props) => {
  const rows = props.rows;
  const tableStyle = { width: "89%", overflow: "hidden", ml: 10, mt: 6 };
  const containerStyle = {height:"587px"};
  return (
    <CommonTable
      rows={rows}
      columns={columns}
      tableStyle={tableStyle}
      height={587}
      cellStyle ={{ p: "10px 10px 10px 15px" }}
      containerStyle = {containerStyle}
    />
  );
};

export default ProjectTable;
