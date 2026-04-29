import { 
    getAll as getAllRepo, 
    getById as getByIdRepo, 
    create as createRepo, 
    update as updateRepo, 
    remove as removeRepo 
} from "../repositories/celestialRepo.js";

/**
 * GET All celestial bodies
 */
export async function getAllBodies() {
    return await getAllRepo();
}

/**
 * GET celestial body by ID
 */
export async function getBodyById(id) {
    const body = await getByIdRepo(id);
    
    if (body) return body;

    const error = new Error(`CelestialBody ${id} not found`);
    error.status = 404;
    throw error;
}

/**
 * CREATE celestial body
 */
export async function createBody(data) {
    return await createRepo(data);
}

/**
 * UPDATE celestial body
 */
export async function updateBody(id, data) {
    const updated = await updateRepo(id, data);

    if (updated) return updated;

    const error = new Error(`CelestialBody ${id} not found`);
    error.status = 404;
    throw error;
}

/**
 * DELETE celestial body
 */
export async function deleteBody(id) {
    const result = await removeRepo(id);

    if (!result) {
        const error = new Error(`CelestialBody ${id} not found`);
        error.status = 404;
        throw error;
    }
    
    return result; 
}