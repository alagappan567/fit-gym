const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  console.log('requireAuth middleware called');
  
  try {
    const { authorization } = req.headers;
    console.log('Authorization header:', authorization);

    if (!authorization) {
      console.log('No authorization header found');
      return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(" ")[1];
    console.log('Token extracted:', token ? 'Present' : 'Missing');

    const decoded = jwt.verify(token, process.env.SECRET);
    console.log('Token decoded successfully:', decoded);

    const user = await User.findOne({ _id: decoded._id }).select("_id");
    if (!user) {
      console.log('No user found with ID:', decoded._id);
      throw new Error('User not found');
    }

    console.log('User found, setting req.user');
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = {
  requireAuth
};