import express from "express";

import {
    getAllResourcesHandler,
    getResourceByIdHandler,
    createResourceHandler,
    updateResourceHandler,
    deleteResourceHandler,
} from "../controllers/resourceController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

router.get("/", authenticate, getAllResourcesHandler);
router.get("/:id", authenticate, getResourceByIdHandler);
router.post("/", authenticate, authAdmin, createResourceHandler);
router.put("/:id", authenticate, authAdmin, updateResourceHandler);
router.delete("/:id", authenticate, authAdmin, deleteResourceHandler);

export default router;