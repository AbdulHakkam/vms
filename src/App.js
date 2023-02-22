import { Route, Routes } from "react-router-dom";
import Projects from "./Pages/Projects/Projects";
import NavBar from "./NavBar/NavBar";
import "./App.css";
import ProjectDetails from "./Pages/ProjectDetails/ProjectDetails";
import { CosmosClient } from "@azure/cosmos";
import { useEffect, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
//import { useAuthContext } from "@asgardeo/auth-react";

function App() {
  const endpoint = "https://vms-db.documents.azure.com:443/";
  const key =
    "ATAyMZfJHzEABY4ufHicQ6o1BcncOH3TBHKJE1ioBhowFjW29qDTmgxrUpU14aO4KlcgLMDk4hSHACDbU76MVA==";
  const client = new CosmosClient({ endpoint, key });
  const [container, setContainer] = useState({});
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchContainer = async () => {
      await client
        .database("vmsDB")
        .containers.createIfNotExists({ id: "vmsContainer" })
        .then((response) => {
          setContainer(response.container);
        });
    };
    fetchContainer();
  }, []);
  useDeepCompareEffect(() => {
    const fetchRow = async (id) => {
      container.items
        .query(`SELECT COUNT(c.id) from c WHERE c.id="${id}"`)
        .fetchAll()
        .then((response) => {
          const assetInfo = id.split("-");
          const row = {
            asset: assetInfo[0],
            assetVersion: assetInfo[1],
            id: id,
            reportCount: response.resources[0].$1,
          };
          setRows((oldRows) => [...oldRows, row]);
        });
    };

    const fetchProjects = async () => {
      container.items
        .query("SELECT DISTINCT c.id from c")
        .fetchAll()
        .then((response) => {
          const projectList = response.resources.map((project) => {
            fetchRow(project.id);
          });
        });
    };
    if (Object.keys(container).length !== 0) {
      fetchProjects();
    }
  }, [container]);

  // const { state } = useAuthContext();
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
          <Route path="/" element={<Projects client={client} rows={rows} />} />
          <Route
            path="/ProjectDetails/:projectTitle"
            element={<ProjectDetails client={container}/>}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
