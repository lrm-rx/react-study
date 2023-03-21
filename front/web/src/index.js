import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "@/assets/css/reset.css";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}></RouterProvider>);
