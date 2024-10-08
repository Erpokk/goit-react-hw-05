import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/goit-react-hw-05">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);