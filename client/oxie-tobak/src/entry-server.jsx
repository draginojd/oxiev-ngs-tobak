import React from "react";
import App from "./App";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar";

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
      <NavBar />
    </StaticRouter>
  );
}