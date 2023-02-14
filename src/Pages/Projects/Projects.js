import NewProjects from "./Components/NewProjects";
import ProjectTable from "./Components/ProjectTable";
import { TextField, Divider, Box, Typography } from "@mui/material";
const Projects = (props) => {
  const handleKeyPress = (event) =>{
    if(event.code==="Enter"){
      console.log(event.target.value);
    }
  }
  return (
    <Box sx={{ position: "absolute", width: "85%", ml: "14%" }}>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ ml: 10, mt: 2, fontSize: 35 }}>Projects</Typography>
        <Box sx={{ position: "absolute", right: 0, mt: 3.5 }}>
          <TextField
            label="Title"
            variant="outlined"
            size="small"
            sx={{mr:13}}
            onKeyPress ={handleKeyPress}
          />
        </Box>
      </Box>
      <Divider sx={{ width: "101%", pb: 2.5 }} />
      <NewProjects />
      <ProjectTable className="projectTable" />
    </Box>
  );
};

export default Projects;
