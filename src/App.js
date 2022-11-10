import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/global.scss";
import Homepage from "./pages/Homepage";
import Repository from "./pages/Repository";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/repository/:owner/:repoName",
    element: <Repository />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
