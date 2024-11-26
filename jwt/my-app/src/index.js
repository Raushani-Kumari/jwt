import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { AuthModelProvider } from "./context/AuthModelContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <AuthModelProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthModelProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
