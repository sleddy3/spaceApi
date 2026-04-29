import express from "express";

import {
    getFavoritesHandler,
    getFavoriteByIdHandler,
    createFavoriteHandler,
    updateFavoriteHandler,
    deleteFavoriteHandler,
} from "../controllers/favoriteController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getFavoritesHandler);
router.get("/:id", authenticate, getFavoriteByIdHandler);
router.post("/", authenticate, createFavoriteHandler);
router.put("/:id", authenticate, updateFavoriteHandler);
router.delete("/:id", authenticate, deleteFavoriteHandler);

export default router;