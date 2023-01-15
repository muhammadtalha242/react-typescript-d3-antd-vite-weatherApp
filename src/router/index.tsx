import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "../components/dashboard";
import App from "../App";
import ErrorPage from "../components/common/error-page";

// interface IPage {
//   key: string;
//   path: string;
//   exact: boolean;
//   element?: React.ElementType;
// }

// const PAGES: IPage[] = [
//   { key: "dashboard", path: "/dashboard", exact: true, element: Dashboard },
// ];

const router = createBrowserRouter([
  { path: "/", element: <App /> , errorElement: <ErrorPage />},
  { path: "/dashboard", element: <Dashboard />, errorElement: <ErrorPage /> },
]);
const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
