import {
    getFavoritesByUser,
    getFavoriteById,
    createFavorite,
    updateFavorite,
    deleteFavorite,
} from "../repositories/favoriteRepo.js";

/**
 * GET all favorites for logged-in user
 */
export async function getFavoritesService(userId) {
    return await getFavoritesByUser(Number(userId));
}

/**
 * GET single favorite by ID (with ownership check)
 */
export async function getFavoriteByIdService(id, userId) {
    const favorite = await getFavoriteById(id);

    if (!favorite) {
        const error = new Error("Favorite not found");
        error.status = 404;
        throw error;
    }

    // Ownership check: comparing as Numbers to be safe
    if (Number(favorite.userId) !== Number(userId)) {
        const error = new Error("Forbidden: You do not own this favorite");
        error.status = 403;
        throw error;
    }

    return favorite;
}

/**
 * CREATE favorite
 */
export async function createFavoriteService(data) {
    const celestialBodyId = data.celestialBodyId;
    const resourceId = data.resourceId;
    const userId = data.userId;

    if (!celestialBodyId && !resourceId) {
        const error = new Error("Must select a celestial body or resource");
        error.status = 400;
        throw error;
    }

    if (celestialBodyId && resourceId) {
        const error = new Error("Cannot favorite both at the same time");
        error.status = 400;
        throw error;
    }

    // Manually building the data object without using ...
    const favoriteData = {
        userId: Number(userId),
        celestialBodyId: celestialBodyId ? Number(celestialBodyId) : null,
        resourceId: resourceId ? Number(resourceId) : null
    };

    return await createFavorite(favoriteData);
}

/**
 * UPDATE favorite (ownership enforced)
 */
export async function updateFavoriteService(id, userId, data) {
    const favorite = await getFavoriteById(id);

    if (!favorite) {
        const error = new Error("Favorite not found");
        error.status = 404;
        throw error;
    }

    if (Number(favorite.userId) !== Number(userId)) {
        const error = new Error("Forbidden");
        error.status = 403;
        throw error;
    }
    
    const celestialBodyId = data.celestialBodyId;
    const resourceId = data.resourceId;

    if (celestialBodyId && resourceId) {
        const error = new Error("Cannot assign both resource types");
        error.status = 400;
        throw error;
    }

    // Manually building the update object
    const updateData = {
        celestialBodyId: celestialBodyId ? Number(celestialBodyId) : null,
        resourceId: resourceId ? Number(resourceId) : null
    };

    return await updateFavorite(id, updateData);
}

/**
 * DELETE favorite (ownership enforced)
 */
export async function deleteFavoriteService(id, userId) {
    const favorite = await getFavoriteById(id);

    if (!favorite) {
        const error = new Error("Favorite not found");
        error.status = 404;
        throw error;
    }

    if (Number(favorite.userId) !== Number(userId)) {
        const error = new Error("Forbidden");
        error.status = 403;
        throw error;
    }

    return await deleteFavorite(id);
}