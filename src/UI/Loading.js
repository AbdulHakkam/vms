import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
const Loading = () => {
  return (
    <Box
      sx={{
        overflow:"hidden",
        position: "fixed",
        backgroundColor: "rgba(189, 188, 188, 0.45)",
        width: "100%",
        height: "100%",
        zIndex: 10,
      }}
    >
      <Box sx={{ color: "orange", mt: "25%", ml: "50%" }}>
        <CircularProgress color="inherit" />
      </Box>
    </Box>
  );
};
export default Loading;
