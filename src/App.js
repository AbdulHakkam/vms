import { Route, Routes } from "react-router-dom";
import Projects from "./Pages/Projects/Projects";
import Contact from "./Pages/Contact";
import NavBar from "./NavBar/NavBar";
import Error from "./Pages/Error";
import "./App.css";
import { useAuthContext } from "@asgardeo/auth-react";

function App() {
  const { state } = useAuthContext();
  return (
    <div className="fullLayout">
      <NavBar />
      <div>
        {/* {state.isAuthenticated === false && (
          <Error/>
        )}
        {state.isAuthenticated === true && (
          <Routes>
            <Route path="/" element={<Projects item={"name"} />} />
            <Route path="/Contact" element={<Contact />} />
          </Routes>
        )} */}
         <Routes>
            <Route path="/" element={<Projects item={"name"} />} />
            <Route path="/Contact" element={<Contact />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
