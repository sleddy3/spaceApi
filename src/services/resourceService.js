import {
    getAllResources,
    getResourceById,
    createResource,
    updateResource,
    deleteResource,
} from "../repositories/resourceRepo.js";

/**
 * GET all resources
 */
export async function getAllResourcesService() {
    return await getAllResources();
}

/**
 * GET resource by ID
 */
export async function getResourceByIdService(id) {
    const resource = await getResourceById(id);

    if (resource) return resource;

    const error = new Error(`Resource ${id} not found`);
    error.status = 404;
    throw error;
}

/**
 * CREATE resource
 */
export async function createResourceService(data) {
    // Manually building the object to avoid using ...
    const resourceData = {
        title: data.title,
        content: data.content,
        type: data.type,
        celestialBodyId: Number(data.celestialBodyId) // Ensure foreign key is a number
    };

    return await createResource(resourceData);
}

/**
 * UPDATE resource
 */
export async function updateResourceService(id, data) {
    // Explicitly mapping fields for update
    const updateData = {
        title: data.title,
        content: data.content,
        type: data.type,
        celestialBodyId: data.celestialBodyId ? Number(data.celestialBodyId) : undefined
    };

    const updated = await updateResource(id, updateData);

    if (updated) return updated;

    const error = new Error(`Resource ${id} not found`);
    error.status = 404;
    throw error;
}

/**
 * DELETE resource
 */
export async function deleteResourceService(id) {
    const result = await deleteResource(id);

    if (!result) {
        const error = new Error(`Resource ${id} not found`);
        error.status = 404;
        throw error;
    }
    
    return result;
}