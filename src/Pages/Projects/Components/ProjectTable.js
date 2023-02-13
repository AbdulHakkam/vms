import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "name", label: "Name", minWidth: "40%" },
  { id: "issuesFound", label: "Issues Found", minWidth: "50%" },
  { id: "issuesFound2", label: "Issues Found", minWidth: "20%" },
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
  { key: "a9", name: "wso2ei-6.0.0", issuesFound: 20, dateCreated: "20-20-20" },
  {
    key: "a10",
    name: "wso2ei-6.0.0",
    issuesFound: 20,
    dateCreated: "20-20-20",
  },
  {
    key: "a11",
    name: "wso2ei-6.0.0",
    issuesFound: 20,
    dateCreated: "20-20-20",
  },
];

const ProjectTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const navigate = useNavigate();
  const handleLink = (link) => {
    navigate(`/ProjectDetails/${link}`);
  };
  return (
    <Paper sx={{ width: "89%", overflow: "hidden", ml: 10, mt: 6 }}>
      <TableContainer sx={{ height: 587 }}>
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
                  <TableRow
                    sx={{ textDecoration: "none" }}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.key}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          onClick={() => {
                            handleLink(row.name);
                          }}
                        >
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
};

export default ProjectTable;