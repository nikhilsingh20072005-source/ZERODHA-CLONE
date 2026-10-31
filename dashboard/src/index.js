import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// Receive the login token from the frontend redirect
const hash = window.location.hash;

if (hash.startsWith("#token=")) {
  const params = new URLSearchParams(hash.slice(1));
  const token = params.get("token");

  if (token) {
    localStorage.setItem("token", token);
  }

  // Remove the token from the address bar
  window.history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search
  );
}