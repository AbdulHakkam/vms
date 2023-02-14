import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const LatestReportTable = (props) => {
  const columns = [
    { id: "name", label: "Name", minWidth: "10%" },
    { id: "type", label: "Type", minWidth: "10%" },
    { id: "createdOn", label: "Created on", minWidth: "10%" },
    { id: "lastUpdated", label: "last Updated", minWidth: "10%" },
    { id: "status", label: "Status", minWidth: "10%" },
  ];
  const rows = props.reportData;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 3,height:375,borderRadius:0 }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCell
                    sx= {{backgroundColor:"#ebebeb"}}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow
                  sx={{ textDecoration: "none" }}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.name}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} sx ={{p:"10px 10px 10px 15px"}}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default LatestReportTable;
