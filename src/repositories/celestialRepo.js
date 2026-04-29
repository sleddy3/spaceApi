import prisma from '../config/db.js';

/**
 * Get all celestial bodies
 */
export async function getAll({ type, sortBy = 'name', order = 'asc' } = {}) {
    const queryOptions = {
        orderBy: {
            [sortBy]: order
        }
    };

    if (type) {
        queryOptions.where = { type };
    }

    return await prisma.celestialBody.findMany(queryOptions);
}

/**
 * Get a single celestial body by ID
 * Includes related resources to provide more data to the UI
 */
export async function getById(id) {
    return await prisma.celestialBody.findUnique({
        where: { id: Number(id) },
        include: { 
            resources: true 
        },
    });
}

/**
 * Create a new celestial body
 */
export async function create(bodyData) {
    return await prisma.celestialBody.create({
        data: bodyData,
    });
}

/**
 * Update a celestial body
 */
export async function update(id, updatedData) {
    try {
        return await prisma.celestialBody.update({
            where: { id: Number(id) },
            data: updatedData,
        });
    } catch (error) {
        // Prisma error code for 'Record not found'
        if (error.code === 'P2025') return null;
        throw error;
    }
}

/**
 * Delete celestial body
 */
export async function remove(id) {
    try {
        await prisma.celestialBody.delete({
            where: { id: Number(id) },
        });
        return true;
    } catch (error) {
        if (error.code === 'P2025') return false;
        throw error;
    }
}