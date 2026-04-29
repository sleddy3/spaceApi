import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

/**
 * POST /api/auth/signup
 * Creates a new user account
 */
router.post("/signup", signup);

/**
 * POST /api/auth/login
 * Logs user in and returns JWT token
 */
router.post("/login", login);

export default router;