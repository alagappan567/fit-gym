const express = require("express");
const { loginUser, signupUser, getAllUsers, updateUserRole, deleteUser } = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Auth routes
router.post("/login", loginUser);
router.post("/signup", signupUser);

// Admin routes - protected by requireAuth
router.use(requireAuth);
router.get("/all", getAllUsers);
router.patch("/:userId/role", updateUserRole);
router.delete("/:userId", deleteUser);

module.exports = router;
