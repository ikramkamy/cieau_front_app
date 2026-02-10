import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CarteFrance from "./pages/CarteFrance";
import Results from "./pages/Resultats";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CarteFrance />,
  },
  {
    path: "/resultats/:INSEE",
    element: <Results />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
