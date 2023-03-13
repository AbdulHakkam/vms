import { Route, Routes } from "react-router-dom";
import Projects from "./Pages/Projects/Projects";
import NavBar from "./NavBar/NavBar";
import "./App.css";
import ProjectDetails from "./Pages/ProjectDetails/ProjectDetails";
import ReportDetails from "./Pages/ReportDetails/ReportDetails";
import { CosmosClient } from "@azure/cosmos";
import { createContext, useEffect, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import Loading from "./UI/Loading";
//import { useAuthContext } from "@asgardeo/auth-react";

export const uiContext = createContext();

const App = () => {
  const endpoint = "";
  const key =
    "";
  const client = new CosmosClient({ endpoint, key });
  const [container, setContainer] = useState({});
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleLoading = (flag) => {
    setLoading(flag);
  };

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
    const fetchProjects = async () => {
      container.items
        .query("SELECT c.id from c")
        .fetchAll()
        .then((response) => {
          setRows([]);
          const unique = response.resources
            .map((item) => item.id)
            .filter((value, index, self) => self.indexOf(value) === index);

          unique.forEach((id) => {
            const assetInfo = id.split("-");
            const occurunces = response.resources.filter((item) => {
              return item.id === id;
            });
            const row = {
              asset: assetInfo[0],
              assetVersion: assetInfo[1],
              reportCount: occurunces.length,
              id: id,
            };
            setRows((oldRows) => [...oldRows, row]);
            setRefresh(false);
          });
          setLoading(false);
        });
    };
    if (Object.keys(container).length !== 0 && refresh) {
      handleLoading(true);
      fetchProjects();
    }
  }, [container, refresh]);

  // const { state } = useAuthContext();
  return (
    <div className="fullLayout">
      <NavBar />
      {loading === true && <Loading />};
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
        <uiContext.Provider value={handleLoading}>
          <Routes>
            <Route
              path="/"
              element={<Projects rows={rows} handleRefresh={setRefresh} />}
            />
            <Route
              path="/ProjectDetails/:projectTitle"
              element={<ProjectDetails container={container} />}
            />
            <Route
              path="/ReportDetails/:reportInfo"
              element={<ReportDetails container={container} />}
            />
          </Routes>
        </uiContext.Provider>
      </div>
    </div>
  );
};

export default App;
