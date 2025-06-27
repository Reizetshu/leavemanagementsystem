// Middleware to authorize access based on user roles
// It takes an array of roles that are allowed to access the route
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if the authenticated user's role is included in the allowed roles array
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role (${req.user.role}) is not authorized to access this resource`,
      });
    }
    next(); // If authorized, proceed to the next middleware or route handler
  };
};

module.exports = authorizeRoles;
