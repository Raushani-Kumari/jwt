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



import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { isAuthenticated, fetchToken } from '../services/authService';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ roles }) => {
  const { user, setUser } = useUser(); // Access user from context
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const validateUser = async () => {
      setIsLoading(true);

      if (isAuthenticated()) {
        try {
          const userData = await fetchToken(); // API call to validate token
          setUser(userData); // Update context with user data

          // Check if roles are present and valid
          const userRoles = userData.roles || [];
          const hasRole = userRoles.some((role) => roles.includes(role));
          setIsAuthorized(hasRole);
          navigate('/admin');
        } catch (error) {
          console.error('Token validation failed:', error);
          setIsAuthorized(false);
        }
      } else {
        setIsAuthorized(false);
      }

      setIsLoading(false);
    };

    validateUser();
  }, [roles, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
