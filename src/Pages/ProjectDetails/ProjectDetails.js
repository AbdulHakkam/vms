import { Box } from "@mui/system";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { projectTitle } = useParams();

  return (
    <Box className="header">
        <h1>{projectTitle}</h1>
    </Box>
  );
};

export default ProjectDetails;
