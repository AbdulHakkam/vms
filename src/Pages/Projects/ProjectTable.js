import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "name", label: "Name", minWidth: 700 },
  { id: "issuesFound", label: "Issues Found", minWidth: 200 },
  { id: "issuesFound2", label: "Issues Found", minWidth: 170 },
  {
    id: "dateCreated",
    label: "Date Created",
    minWidth: 200,
    format: (value) => value.toLocaleString("en-US"),
  },
];

const rows = [
  { key: "a1", name: "wso2ei-6.0.0", issuesFound: 20, dateCreated: "20-20-20" },
  { key: "a2", name: "wso2ei-6.0.0", issuesFound: 20, dateCreated: "20-20-20" },
  { key: "a3", name: "wso2ei-6.0.0", issuesFound: 20, dateCreated: "20-20-20" },
  { key: "a4", name: "wso2ei-6.0.0", issuesFound: 20, dateCreated: "20-20-20" },
  { key: "a5", name: "wso2ei-6.0.0", issuesFound: 20, dateCreated: "20-20-20" },
  { key: "a6", name: "wso2ei-6.0.0", issuesFound: 20, dateCreated: "20-20-20" },
  { key: "a7", name: "wso2ei-6.0.0", issuesFound: 20, dateCreated: "20-20-20" },
  { key: "a8", name: "wso2ei-6.0.0", issuesFound: 20, dateCreated: "20-20-20" },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", ml: 13, mt: 30 }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCell
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.key}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
