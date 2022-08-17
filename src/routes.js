import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/Page404";
import AddContent from "./pages/AddContent";
import Contents from "./pages/Contents";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Kakao from "./pages/Kakao";
import Google from "./pages/Google";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        // { element: <Navigate to="/dashboard/app" replace /> },
        { path: "app", element: <Dashboard /> },
        { path: "contents/:id", element: <Contents /> },
        { path: "add", element: <AddContent /> },
        { path: "", element: <Navigate to="/dashboard/app" /> },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "kakao/redirect", element: <Kakao /> },
        { path: "google/redirect", element: <Google /> },
        { path: "send-password-reset-email", element: <ResetPassword /> },
        { path: "reset/:code", element: <ResetPassword /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/dashboard/app" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
