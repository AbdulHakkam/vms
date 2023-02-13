import NewProjects from "./Components/NewProjects";
import ProjectTable from "./Components/ProjectTable";
import { TextField, Divider, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const Projects = (props) => {
  return (
    <Box sx={{ position: "absolute", width: "85%", ml: "14%" }}>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ ml: 10, mt: 2, fontSize: 35 }}>Projects</Typography>
        <Box sx={{ position: "absolute", right: 0, mt: 3.5 }}>
          <TextField
            label="Title"
            variant="outlined"
            size="small"
            sx={{ mr: 0 }}
          />
          <SearchIcon sx={{ mt: 1, ml: 1, mr: 13 }} />
        </Box>
      </Box>
      <Divider sx={{ width: "101%", pb: 4 }} />
      <NewProjects />
      <ProjectTable className="projectTable" />
    </Box>
  );
};

export default Projects;
