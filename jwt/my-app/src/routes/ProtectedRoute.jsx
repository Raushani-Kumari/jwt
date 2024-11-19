// import React, { useEffect, useState } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { isAuthenticated, fetchToken } from '../services/authService';
// import { useUser } from '../context/UserContext';

// const ProtectedRoute = ({ roles }) => {
//   const { user, setUser } = useUser();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   useEffect(() => {
//     const validateUser = async () => {
//       setIsLoading(true);
//       if (isAuthenticated()) {
//         try {
//           const userData = await fetchToken();
//           console.log("user data in protected route", userData);
//           setUser(userData); // Update context with user data
//           const hasRole = roles.some((role) => userData.roles.includes(role)); // Check for valid roles
//           console.log("ha role from protected component", hasRole)
//           setIsAuthorized(hasRole);
//         } catch (error) {
//           console.error('Token validation failed:', error);
//           setIsAuthorized(false);
//         }
//       }
//       setIsLoading(false);
//     };

//     validateUser();
//   }, [roles, setUser]);

//   if (isLoading) {
//     return <div>Loading...</div>; // Show a loading spinner or placeholder
//   }

//   if (!isAuthorized) {
//     return <Navigate to="/login" />; // Redirect to login if unauthorized
//   }

//   return <Outlet />; // Render child routes if authorized
// };

// export default ProtectedRoute;

import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import { isAuthenticated, fetchToken } from "../services/authService";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ roles, children }) => {
  const { user } = useContext(UserContext); // Access user from context
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
