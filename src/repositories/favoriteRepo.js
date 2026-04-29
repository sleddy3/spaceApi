import prisma from '../config/db.js';

/**
 * GET all favorites for a user
 * Includes the celestial body details so the user knows what they favorited
 */
export async function getFavoritesByUser(userId) {
    return await prisma.favorite.findMany({
        where: { userId: Number(userId) },
        include: {
            celestialBody: true // This joins the planet data
        }
    });
}

/**
 * GET favorite by ID
 */
export async function getFavoriteById(id) {
    return await prisma.favorite.findUnique({
        where: { id: Number(id) },
    });
}

/**
 * CREATE favorite
 */
export async function createFavorite(data) {
    return await prisma.favorite.create({
        data: {
            userId: Number(data.userId),
            celestialBodyId: Number(data.celestialBodyId)
        },
    });
}

/**
 * UPDATE favorite
 */
export async function updateFavorite(id, data) {
    try {
        return await prisma.favorite.update({
            where: { id: Number(id) },
            data,
        });
    } catch (err) {
        if (err.code === "P2025") return null;
        throw err;
    }
}

/**
 * DELETE favorite
 */
export async function deleteFavorite(id) {
    try {
        return await prisma.favorite.delete({
            where: { id: Number(id) },
        });
    } catch (err) {
        if (err.code === "P2025") return null;
        throw err;
    }
}