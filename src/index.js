import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

//React strictmode removed to allow the drag and drop library work
const root = ReactDOM.createRoot(
 document.getElementById("root")
);
root.render(
 <BrowserRouter>
  <App />
 </BrowserRouter>
);
