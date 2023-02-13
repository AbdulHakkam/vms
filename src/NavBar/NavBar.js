import { Link } from "react-router-dom";
import { Button, Divider, Typography } from "@mui/material";
import { useAuthContext } from "@asgardeo/auth-react";
import { Box } from "@mui/system";
const NavBar = () => {
  const buttonStyle = {
    bgcolor: "white",
    color: "black",
    borderRadius: 1,
    width: 200,
    boxShadow: 1,
    textTransform: "none",
    mb: "40px",
  };
  const { state, signIn, signOut } = useAuthContext();

  return (
    <Box
      sx={{
        backgroundColor: "#fd7e14",
        width: "14%",
        height: "100vh",
        position: "fixed",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          mt: "20px",
          color: "white",
          fontSize: "35px",
          mb: "15px",
        }}
      >
        VMS
      </Typography>
      <Divider sx={{ backgroundColor: "white", marginBottom: "4em" }}></Divider>
      <Box sx={{ textAlign: "center" }}>
        <Button sx={buttonStyle} component={Link} to={"/"}>
          Projects
        </Button>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        {state.isAuthenticated ? (
          <Button sx={buttonStyle} onClick={() => signOut()}>
            Sign Out
          </Button>
        ) : (
          <Button sx={buttonStyle} onClick={() => signIn()}>
            Sign In
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default NavBar;
