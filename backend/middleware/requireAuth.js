const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Creating middleware function
const requireAuth = function(req, res, next) {
  console.log('requireAuth middleware executing');
  
  // Check for auth header
  const { authorization } = req.headers;

  if (!authorization) {
    console.log('No authorization header');
    return res.status(401).json({ error: "Authorization token required" });
  }

  try {
    // Verify token
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        console.log('Token verification failed:', err.message);
        return res.status(401).json({ error: "Request is not authorized" });
      }

      // Find user
      try {
        const user = await User.findOne({ _id: decoded._id }).select("_id");
        if (!user) {
          console.log('User not found');
          return res.status(401).json({ error: "User not found" });
        }
        
        req.user = user;
        next();
      } catch (error) {
        console.log('Database error:', error.message);
        res.status(500).json({ error: "Database error" });
      }
    });
  } catch (error) {
    console.log('Auth error:', error.message);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

// Export the middleware directly
module.exports = requireAuth;