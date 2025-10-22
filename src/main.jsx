import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import criticalStyles from "./index.css?inline";
import { getCSP } from "./config/csp.js";

const setCSP = () => {
  const metaTag = document.createElement('meta');
  metaTag.setAttribute('http-equiv', 'Content-Security-Policy');
  metaTag.setAttribute('content', getCSP());
  document.head.appendChild(metaTag);
};

const injectCriticalStyles = () => {
  const styleEl = document.createElement('style');
  styleEl.setAttribute('data-critical', 'true');
  styleEl.textContent = criticalStyles;
  document.head.appendChild(styleEl);
};

setCSP();
injectCriticalStyles();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
