import React from "react";
import ReactDOM from "react-dom";
import { AuthContextProvider } from "./authContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
