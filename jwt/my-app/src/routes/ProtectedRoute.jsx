import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import { isAuthenticated, fetchToken } from "../services/authService";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ roles, children }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAuthenticated) {
      navigate("/login");
    }
    console.log("protected route", user);

    // Check if roles are present and valid
    const userRoles = user?.role;

    if (!userRoles) {
      navigate("/login");
    }

    const hasRequiredRole = userRoles?.some((role) => roles.includes(role));
    if (!hasRequiredRole) {
      navigate("/error", { state: { message: "unauthorized" } });
    }
  }, [navigate]);

  return <div>{children}</div>;
};

export default ProtectedRoute;
