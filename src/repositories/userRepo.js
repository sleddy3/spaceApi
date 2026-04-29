import prisma from '../config/db.js';

/**
 * Creates a new user in the database
 * @param {Object} data - user data (username, email, password, role)
 * @returns {Promise<Object>} created user
 */
export const createUser = async (data) => {
    return await prisma.user.create({
        data,
    });
};

/**
 * Finds a user by their email address
 * Used mainly for login authentication
 * @param {string} email 
 * @returns {Promise<Object|null>} user or null if not found
 */
export const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: { email },
    });
};

/**
 * Finds a user by their ID
 * @param {number|string} id
 * @returns {Promise<Object|null>} user or null if not found
 */
export const findUserById = async (id) => {
    return await prisma.user.findUnique({
        where: { id: Number(id) },
    });
};

/**
 * Retrieves all users from the database
 * @returns {Promise<Array>} list of users
 */
export const getAllUsers = async () => {
    return await prisma.user.findMany();
};

/**
 * Deletes a user by ID
 * @param {number|string} id - user ID
 * @returns {Promise<Object|null>} deleted user record or null if not found
 */
export const deleteUser = async (id) => {
    try {
        return await prisma.user.delete({
            where: { id: Number(id) },
        });
    } catch (error) {
        if (error.code === "P2025") return null;
        throw error;
    }
};