import prisma from '../config/db.js';

/**
 * GET all resources
 * Includes the parent celestial body information
 */
export const getAllResources = async () => {
    return await prisma.resource.findMany({
        include: {
            celestialBody: true, // Joins the related planet/star info
        },
    });
};

/**
 * GET resource by ID
 */
export const getResourceById = async (id) => {
    return await prisma.resource.findUnique({
        where: { id: Number(id) },
        include: {
            celestialBody: true,
        },
    });
};

/**
 * CREATE resource
 */
export const createResource = async (data) => {
    return await prisma.resource.create({
        data: {
            ...data,
            celestialBodyId: Number(data.celestialBodyId) // Ensure the foreign key is a Number
        },
    });
};

/**
 * UPDATE resource
 */
export const updateResource = async (id, data) => {
    try {
        return await prisma.resource.update({
            where: { id: Number(id) },
            data,
        });
    } catch (error) {
        if (error.code === "P2025") return null;
        throw error;
    }
};

/**
 * DELETE resource
 */
export const deleteResource = async (id) => {
    try {
        return await prisma.resource.delete({
            where: { id: Number(id) },
        });
    } catch (error) {
        if (error.code === "P2025") return null;
        throw error;
    }
};