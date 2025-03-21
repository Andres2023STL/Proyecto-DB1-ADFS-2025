import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './assets/styles/global.css';
import './assets/styles/public.css';
import './assets/styles/cards.css';
import './assets/styles/private.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
