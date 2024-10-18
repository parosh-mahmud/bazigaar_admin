import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const authInfo = JSON.parse(localStorage.getItem("authInfo"));
  const user = authInfo?.token;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
