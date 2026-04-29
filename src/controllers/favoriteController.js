import {
    getFavoritesService,
    getFavoriteByIdService,
    createFavoriteService,
    updateFavoriteService,
    deleteFavoriteService,
} from "../services/favoriteService.js";

/**
 * GET /api/favorites
 */
export async function getFavoritesHandler(req, res, next) {
    try {
        const userId = req.user.id;
        const favorites = await getFavoritesService(userId);
        res.status(200).json(favorites);
    } catch (error) {
        next(error);
    }
}

/**
 * GET /api/favorites/:id
 */
export async function getFavoriteByIdHandler(req, res, next) {
    try {
        const userId = req.user.id;
        const id = parseInt(req.params.id);

        const favorite = await getFavoriteByIdService(id, userId);
        res.status(200).json(favorite);
    } catch (error) {
        next(error);
    }
}

/**
 * POST /api/favorites
 */
export async function createFavoriteHandler(req, res, next) {
    try {
        const userId = req.user.id;
        
        // Explicit extraction
        const favoriteData = {
            userId: userId,
            resourceId: req.body.resourceId || null,
            celestialBodyId: req.body.celestialBodyId || null,
        };

        const newFavorite = await createFavoriteService(favoriteData);
        res.status(201).json(newFavorite);
    } catch (error) {
        next(error);
    }
}

/**
 * PUT /api/favorites/:id
 */
export async function updateFavoriteHandler(req, res, next) {
    try {
        const userId = req.user.id;
        const id = parseInt(req.params.id);

        const updateData = {
            resourceId: req.body.resourceId,
            celestialBodyId: req.body.celestialBodyId,
        };

        const updated = await updateFavoriteService(id, userId, updateData);
        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
}

/**
 * DELETE /api/favorites/:id
 */
export async function deleteFavoriteHandler(req, res, next) {
    try {
        const userId = req.user.id;
        const id = parseInt(req.params.id);

        await deleteFavoriteService(id, userId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}