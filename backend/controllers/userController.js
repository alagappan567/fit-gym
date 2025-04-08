const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.login(email, password);

    // Verify if the user's role matches the requested role
    if (role && user.role !== role) {
      return res.status(403).json({ error: `Invalid login. Please use the correct ${role} login option.` });
    }

    const token = createToken(user._id);

    res.status(200).json({ 
      username: user.username, 
      email, 
      token,
      role: user.role 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const user = await User.signup(username, email, password, role);
    const token = createToken(user._id);

    res.status(200).json({ 
      username, 
      email, 
      token,
      role: user.role 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admin-only route to get all users
const getAllUsers = async (req, res) => {
  try {
    // Check if the requesting user is an admin
    const adminUser = await User.findById(req.user._id);
    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ error: "Not authorized" });
    }

    const users = await User.find({}).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user role (admin only)
const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    // Verify admin user
    const adminUser = await User.findById(req.user._id);
    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ error: "Not authorized" });
    }

    // Don't allow changing own role
    if (userId === req.user._id.toString()) {
      return res.status(400).json({ error: "Cannot change your own role" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: "Role updated successfully", role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete user (admin only)
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Verify admin user
    const adminUser = await User.findById(req.user._id);
    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ error: "Not authorized" });
    }

    // Don't allow deleting self
    if (userId === req.user._id.toString()) {
      return res.status(400).json({ error: "Cannot delete your own account" });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { 
  signupUser, 
  loginUser, 
  getAllUsers,
  updateUserRole,
  deleteUser
};
