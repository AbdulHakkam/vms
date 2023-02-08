import ProjectTable from "./ProjectTable";
import NewProjects from "./NewProjects";
import "./Projects.css";
import { TextField , Divider} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const Projects = (props) => {
  return (
    <div className="projectBody">
      <div className="header">
        <h1>Projects</h1>
        <div className="search">
          <TextField label="Title" variant="outlined" size="small" sx={{mr:0}} />
          <SearchIcon sx={{ mt: 1, ml: 1, mr:25 }} />
        </div>
      </div>
      <Divider sx={{width:"100%" , pb:4.5}}/>
      <NewProjects/>
      <ProjectTable className="projectTable" />
    </div>
  );
};

export default Projects;
