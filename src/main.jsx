import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HistoryProvider } from "./components/readInputData";

const select = document.getElementById("root");
const root = ReactDOM.createRoot(select);

root.render(
  <HistoryProvider>
    <App/>
  </HistoryProvider>
);
