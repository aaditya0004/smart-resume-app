import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// When a GET request is made to '/api/users/profile', it will first run
// the 'protect' middleware. If the token is valid, it will then run
// the 'getUserProfile' controller function.
router.get("/profile", protect, getUserProfile);

export default router;