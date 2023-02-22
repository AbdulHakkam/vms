import NewProjects from "./Components/NewProjects";
import ProjectTable from "./Components/ProjectTable";
import { TextField, Divider, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
const Projects = (props) => {
  const rows = props.rows;
  const [filteredRows, setFilteredRows] = useState(rows);
  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  const handleKeyPress = (event) => {
    if (event.code === "Enter") {
      const val = event.target.value;
      const filteredRows = rows.filter((row) => {
        if (row.name.includes(val)) {
          return true;
        }
        return false;
      });
      setFilteredRows(filteredRows);
    }
  };

  return (
    <Box sx={{ position: "absolute", width: "90%", ml: "14%" }}>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ ml: 10, mt: 2, fontSize: 35 }}>Projects</Typography>
        <Box sx={{ position: "absolute", right: 0, mt: 3.5, br: 5 }}>
          <TextField
            label="Title"
            variant="outlined"
            size="small"
            sx={{ mr: 13, bgcolor: "white", borderRadius: 2 }}
            onKeyPress={handleKeyPress}
          />
        </Box>
      </Box>
      <Divider sx={{ width: "101%", pb: 2.5 }} />
      <NewProjects />
      <ProjectTable rows={filteredRows} />
    </Box>
  );
};

export default Projects;
