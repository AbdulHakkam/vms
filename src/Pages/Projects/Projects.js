import ProjectTable from "./ProjectTable";
import "./Projects.css";
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
const Projects = (props) => {
  return (
    <div className="projectBody">
      <div className="header">
        <h1>Projects</h1>
        <div className="search">
          <TextField
            label="Title"
            variant="outlined"
            size="small"
          />
          <SearchIcon sx={{mt:1,ml:1}}/>
          </div>
      </div>
      <ProjectTable className="projectTable" />
    </div>
  );
};

export default Projects;
