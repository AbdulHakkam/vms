import CommonTable from "../../../UI/CommonTable";

const LatestReportTable = (props) => {
  const columns = [
    { id: "reportId", label: "Report Id", minWidth: "10%" },
    { id: "scannerType", label: "Scanner Type", minWidth: "10%" },
    { id: "lastUpdated", label: "last Updated", minWidth: "10%" },
    { id: "createdOn", label: "Created on", minWidth: "10%" },
    { id: "issueCount", label: "No. Issues", minWidth: "10%" },
  ];
  const rows = props.reportData;
  const tableStyle = {
    width: "100%",
    overflow: "hidden",
    borderRadius: 0,
  };

  return (
    <CommonTable
      columns={columns}
      rows={rows}
      tableStyle={tableStyle}
      containerStyle={{height:"246px"}}
      cellStyle={{ p: "10px 10px 10px 15px" }}
      link={1}
      path ={"ReportDetails"}
    />
  );
};
export default LatestReportTable;
