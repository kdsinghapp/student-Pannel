import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("adminToken");

  return isAuthenticated ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoute;
