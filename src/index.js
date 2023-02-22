import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./Fonts/Montserrat.ttf";
import { AuthProvider } from "@asgardeo/auth-react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider
    config={{
      signInRedirectURL: "http://localhost:3000/",
      signOutRedirectURL: "http://localhost:3000/",
      clientID: "vf44T_DQszY3hJ2xQThK6yDIYRAa",
      baseUrl: "https://api.asgardeo.io/t/sample404",
      scope: ["openid", "profile"],
      disableTrySignInSilently: false,
    }}
  >
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </AuthProvider>
);
