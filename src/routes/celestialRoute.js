import express from "express";
import {
    getAllCelestialBodiesHandler,
    getCelestialBodyByIdHandler,
    createCelestialBodyHandler,
    updateCelestialBodyHandler,
    deleteCelestialBodyHandler,
} from "../controllers/celestialController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

router.get("/", authenticate, getAllCelestialBodiesHandler);
router.get("/:id", authenticate, getCelestialBodyByIdHandler);
router.post("/", authenticate, authAdmin, createCelestialBodyHandler);
router.put("/:id", authenticate, authAdmin, updateCelestialBodyHandler);
router.delete("/:id", authenticate, authAdmin, deleteCelestialBodyHandler);

export default router; 
