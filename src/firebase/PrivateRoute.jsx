import React from "react";
import { Navigate } from "react-router-dom";
import { UseAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = UseAuth();
  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
