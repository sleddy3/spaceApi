import {
    findUserById,
    getAllUsers,
    deleteUser,
} from "../repositories/userRepo.js";

/**
 * GET all users
 */
export async function getAllUsersService() {
    const users = await getAllUsers();
    
    users.forEach(user => {
        delete user.password; 
    });
    
    return users;
}

/**
 * GET user by ID
 */
export async function getUserByIdService(id) {
    const user = await findUserById(id);

    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    delete user.password;
    
    return user;
}

/**
 * DELETE user
 */
export async function deleteUserService(id) {
    const user = await findUserById(id);

    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    return await deleteUser(id);
}