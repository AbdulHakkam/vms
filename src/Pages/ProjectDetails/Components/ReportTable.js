import CommonTable from "../../../UI/CommonTable";

const ReportTable = (props) => {
  const columns = [
    { id: "reportId", label: "Report Id", minWidth: "10%" },
    { id: "scannerType", label: "Scanner Type", minWidth: "10%" },
    { id: "lastUpdated", label: "last Updated", minWidth: "10%" },
    { id: "createdOn", label: "Created on", minWidth: "10%" },
    { id: "issueCount", label: "No. Issues", minWidth: "10%" },
  ];
  const rows = props.reportData;
  const containerStyle = {height:"536px"};
  return (
    <CommonTable
      rows={rows}
      columns={columns}
      tableStyle={{ width: "100%", overflow: "hidden", ml: 0, mt: 3 }}
      containerStyle={containerStyle}
      cellStyle = {{p:"10px 10px 10px 15px"}}
      link={1}
      path ={"ReportDetails"}
    />
  );
};
export default ReportTable;
