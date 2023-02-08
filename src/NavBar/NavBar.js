import { Link } from "react-router-dom";
import "./NavBar.css";
import { Button } from "@mui/material";
import { useAuthContext } from "@asgardeo/auth-react";
const NavBar = () => {
  const buttonStyle = {
    bgcolor: "white",
    color: "black",
    borderRadius: 1,
    width: 200,
    boxShadow: 1,
    textTransform:"none"
  };
  const { state, signIn, signOut } = useAuthContext();

  return (
    <nav className="navContainer">
      <h1>VMS</h1>
      <hr style ={{color:"white" ,marginBottom:"4em"}}></hr>
      <ul>
        <Button sx={buttonStyle} component={Link} to={"/"}>
          Projects
        </Button>
      </ul>
      <ul>
        <Button sx={buttonStyle} component={Link} to={"/Contact"}>
          Scanners
        </Button>
      </ul>
      <ul>
        <Button sx={buttonStyle} component={Link} to={"/Contact"}>
          Upload
        </Button>
      </ul>
      <ul className="logOutButton">
        {state.isAuthenticated? (<Button sx={buttonStyle} onClick={()=>signOut()}>Sign Out</Button>) : <Button sx={buttonStyle} onClick={()=>signIn()}>Sign In</Button>}
      </ul>
    </nav>
  );
};

export default NavBar;
