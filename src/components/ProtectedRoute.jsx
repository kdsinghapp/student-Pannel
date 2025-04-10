import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("adminToken"); 

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoute;
