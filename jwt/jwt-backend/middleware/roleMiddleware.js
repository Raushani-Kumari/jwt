// const authorizedRoles = (...allowedRoles) => {
  
//     return (req, res, next) => {
//         console.log("user called from authorizedroles : ", req.user.userId) 
//         if(!allowedRoles.includes(req.user.role)) {
//             return res.status(403).json({message: "Access Denied"});
//         }
//         next();
//     }
// }

// export default  authorizedRoles;


import User from '../models/UserModel.js'; // Import your User model (adjust the path as necessary)

const authorizedRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      // Fetch the user from the database using the userId from req.user
      const user = await User.findById(req.user.userId);

      // If the user is not found, return a 404 error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Log the user data (optional for debugging)
      console.log("User data from database: ", user);
      console.log("checking role : ", user.role)

      // Check if the user's role is one of the allowed roles
      const hasAccessRole = user.role.some(r => allowedRoles.includes(r));
      if (!hasAccessRole) {
        return res.status(403).json({ message: 'Access Denied' });
      }

      // If the role is authorized, proceed to the next middleware or route handler
      console.log("hey your role is : ", user.role)
      next();
    } catch (error) {
      // Handle errors, such as DB connection issues
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
};

export default authorizedRoles;
