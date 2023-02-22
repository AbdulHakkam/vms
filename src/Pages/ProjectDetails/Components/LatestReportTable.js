import CommonTable from "../../../UI/CommonTable";

const LatestReportTable = (props) => {
  const columns = [
    { id: "name", label: "Name", minWidth: "10%" },
    { id: "type", label: "Type", minWidth: "10%" },
    { id: "createdOn", label: "Created on", minWidth: "10%" },
    { id: "lastUpdated", label: "last Updated", minWidth: "10%" },
    { id: "status", label: "Status", minWidth: "10%" },
  ];
  const rows = props.reportData;
  const tableStyle = {
    width: "100%",
    overflow: "hidden",
    height: 299,
    borderRadius: 0,
  };

  return (
    <CommonTable
      columns={columns}
      rows={rows}
      tableStyle={tableStyle}
      cellStyle={{ p: "10px 10px 10px 15px" }}
    />
  );
};
export default LatestReportTable;
