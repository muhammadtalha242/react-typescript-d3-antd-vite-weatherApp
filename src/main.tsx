import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider as WeatherContextProvider } from "./context/weather-api.context";
import Router from "./router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WeatherContextProvider>
      <Router />
    </WeatherContextProvider>
  </React.StrictMode>
);
