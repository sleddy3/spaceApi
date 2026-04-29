import express from "express";

import {
    getAllUsersHandler,
    getUserByIdHandler,
    deleteUserHandler,
} from "../controllers/userController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

router.get("/", authenticate, authAdmin, getAllUsersHandler);
router.get("/:id", authenticate, authAdmin, getUserByIdHandler);
router.delete("/:id", authenticate, authAdmin, deleteUserHandler);

export default router;