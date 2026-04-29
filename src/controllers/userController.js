import {
    getAllUsersService,
    getUserByIdService,
    deleteUserService,
} from "../services/userService.js";

/**
 * GET /api/users
 * (ADMIN ONLY)
 */
export async function getAllUsersHandler(req, res, next) {
    try {
        const users = await getAllUsersService();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

/**
 * GET /api/users/:id
 * (ADMIN ONLY)
 */
export async function getUserByIdHandler(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const user = await getUserByIdService(id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

/**
 * DELETE /api/users/:id
 * (ADMIN ONLY)
 */
export async function deleteUserHandler(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        await deleteUserService(id);
        // 204 means success, but no content to send back
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}