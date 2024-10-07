// PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useProgress } from "./../context/ProgressProvider";

const PrivateRoute = ({ children, stage }) => {
  const { progress } = useProgress();
  return progress >= stage ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;